helpers do
  def crop_url(url)
    url.length > 20 ? url[0..30]+".."+url[-5..-1] : url
  end

  def shorten_string(string, max_chars)
    string.length > max_chars ? string[0..(max_chars-5)] + "..." + string[-2..-1] : string
  end

  def parse_time(input_time)
    elapsed_seconds = (Time.now - input_time).to_i
    result = []
    case
    when elapsed_seconds < 60
      result.push(elapsed_seconds, "seconds")
    when elapsed_seconds < 60*60
      result.push(elapsed_seconds/60, "minutes")
    when elapsed_seconds < 60*60*24
      result.push(elapsed_seconds/(60*60), "hours")
    when elapsed_seconds < 60*60*24*7
      result.push(elapsed_seconds/(60*60*24), "days")
    when elapsed_seconds < 60*60*24*30
      result.push(elapsed_seconds/(60*60*24*7), "weeks")
    when elapsed_seconds < 60*60*24*365
      result.push(elapsed_seconds/(60*60*24*30), "months")
    else
      result.push(elapsed_seconds/(60*60*24*365), "years")
    end
    if result[0] == 1
      result[1].chop!
      result.join(' ')+' ago'
    else
      result.join(' ')+' ago'
    end
  end

end
