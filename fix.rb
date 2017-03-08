require 'json'
require 'pry'

week2 = JSON.parse(File.read('db/week02.json'))
week3 = JSON.parse(File.read('db/week03.json'))

week3['stats'].keys.each do |player|
  next if player.include?('(S)')

  week2_salary = week2['stats'][player]['Salary']
  week3_salary = week3['stats'][player]['Salary']
  delta = week3_salary - week2_salary

  week3['stats'][player]['SalaryDelta'] = delta
end

File.open("db/week03_with_deltas.json","w") do |f|
  f.write(JSON.pretty_generate(week3))
end
