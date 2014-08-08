json.array!(@levels) do |level|
  json.extract! level, :id, :red, :blue, :green
  json.url level_url(level, format: :json)
end
