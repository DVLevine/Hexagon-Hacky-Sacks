json.array!(@raindrops) do |raindrop|
  json.extract! raindrop, :id, :water, :shiny
  json.url raindrop_url(raindrop, format: :json)
end
