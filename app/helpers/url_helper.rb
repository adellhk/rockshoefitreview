
helpers do
  def crop_url(url)
    url.length > 20 ? url[0..30]+".."+url[-5..-1] : url
  end

end
