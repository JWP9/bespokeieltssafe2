/*
  # Create admin task 1 model answers table

  1. New Tables
    - `admin_task1_answers`
      - `id` (serial, primary key) - Sequential identifier
      - `prompt_id` (integer, unique) - References the task1 prompt ID
      - `chart_type` (text) - Type of chart (bar, line, pie, etc.)
      - `model_answer` (text) - Band 9 model answer
      - `word_count` (integer) - Word count of answer
      - `created_at` (timestamptz) - Creation timestamp
  
  2. Security
    - No RLS policies - admin table only
    - Not exposed to public users
*/

CREATE TABLE IF NOT EXISTS admin_task1_answers (
  id serial PRIMARY KEY,
  prompt_id integer UNIQUE NOT NULL,
  chart_type text NOT NULL,
  model_answer text NOT NULL,
  word_count integer DEFAULT 180 CHECK (word_count >= 150 AND word_count <= 200),
  created_at timestamptz DEFAULT now()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_admin_task1_prompt_id ON admin_task1_answers(prompt_id);
CREATE INDEX IF NOT EXISTS idx_admin_task1_chart_type ON admin_task1_answers(chart_type);

-- Insert 5 Band 9 model answers matching the generated charts
INSERT INTO admin_task1_answers (prompt_id, chart_type, model_answer, word_count) VALUES
(1, 'bar', 'The bar chart compares annual sales figures for electric and petrol vehicles in North America between 2015 and 2024, measured in millions of units.

Overall, electric vehicle sales experienced exponential growth throughout the period, whereas petrol vehicle sales declined gradually. By 2024, the gap between the two categories had narrowed substantially compared to the starting year.

In 2015, petrol vehicles dominated with approximately 18 million units sold, dwarfing electric vehicle sales which stood at merely 0.5 million. Over the subsequent five years, petrol sales remained relatively stable, fluctuating between 17 and 19 million units annually, before beginning a noticeable downward trajectory after 2020.

Conversely, electric vehicle sales surged dramatically. From 2015 to 2020, figures climbed from 0.5 million to 3 million units. The growth accelerated markedly thereafter, reaching 7 million by 2022 and nearly 12 million in 2024. Meanwhile, petrol vehicle sales fell to approximately 14 million units, suggesting a significant shift in consumer preferences toward electric mobility.', 173),

(2, 'line', 'The line graph illustrates global plastic waste production from 1990 to 2030, with the latter years representing projected figures, measured in million tonnes.

Overall, plastic waste generation exhibited consistent upward growth throughout the observed period, with forecasts indicating this trend will continue. The data reveals a nearly threefold increase from 1990 levels by 2030.

In 1990, global plastic waste stood at 150 million tonnes. Over the following two decades, production rose steadily, reaching 250 million tonnes by 2010 and climbing further to 360 million tonnes by 2020. This represents an average annual increase of approximately 10 million tonnes during the historical 30-year period.

Projections for 2025-2030 suggest the upward trajectory will persist. By 2025, production is expected to reach 400 million tonnes, with forecasts indicating it will approach 445 million tonnes by 2030. Notably, despite growing environmental awareness, the rate of increase shows no signs of deceleration, highlighting the urgent need for effective waste management interventions.', 177),

(3, 'pie', 'The pie chart illustrates the proportional contribution of different energy sources to electricity generation in a European country in 2025.

Overall, renewable energy dominates the mix, accounting for nearly half of total production, while coal represents the smallest contribution. This distribution reflects a clear transition toward sustainable energy sources.

Renewable energy including wind, solar, and hydroelectric power collectively comprises 45% of electricity generation, making it the largest single category by a considerable margin. Natural gas contributes 22% of production, serving as the second-largest source. Nuclear energy provides 21% of generation capacity, representing only marginally less than natural gas and indicating continued reliance on this technology for baseload power requirements.

Coal, historically a dominant energy source in European electricity generation, now accounts for merely 12% of the mix, having been substantially phased out in favor of cleaner alternatives. This dramatic reduction reflects environmental policy priorities and technological shifts toward lower-carbon energy systems that characterize contemporary European energy strategies.', 174),

(4, 'bar', 'The bar chart compares smartphone sales across five major manufacturers in 2024, measured in millions of units sold.

Overall, Apple maintained market leadership despite intense competition from Asian manufacturers. The top three brands accounted for the majority of sales, while smaller players captured a modest combined market share.

Apple led with 80 million units sold, establishing a comfortable margin over its closest competitor. This dominant position reflects the brand''s premium market positioning and loyal customer base. Samsung followed in second place with 70 million units, demonstrating strong performance particularly in mid-range market segments.

Xiaomi occupied third position with 50 million units sold, substantially trailing the market leaders but maintaining significant presence especially in price-sensitive markets. Oppo achieved 35 million units, while various smaller brands collectively accounted for 30 million units. These figures suggest a highly concentrated market where established players dominate, with the top two manufacturers alone surpassing the combined sales of all other brands by a considerable margin.', 171),

(5, 'line', 'The line graph presents the increase in average global temperatures relative to 1900 baseline levels over a 124-year period ending in 2024, measured in degrees Celsius.

Overall, temperatures remained relatively stable through the first half of the twentieth century before accelerating dramatically from 1980 onward. The data reveals that global warming intensified significantly in recent decades.

From 1900 to 1960, temperature increases remained minimal, rising only 0.2 degrees Celsius over sixty years. This gradual warming suggested relatively stable climatic conditions during the early industrial period, with human activities exerting limited influence on global temperatures.

However, from 1980 onward, the warming trend accelerated markedly. Between 1980 and 2000, temperatures climbed from 0.45 to 0.75 degrees, representing the steepest increase observed in any comparable twenty-year period. This acceleration continued into the twenty-first century, with temperatures reaching 0.95 degrees by 2010 and 1.2 degrees by 2024, demonstrating the intensification of climate change impacts in the modern era.', 176);
