class Shoe < ActiveRecord::Base
  has_many :reviews

  def generate_display_name
    self.display_name = self.brand + " " + self.model
  end

  def generate_image_url
    path = generate_display_name.gsub(" ", "_").gsub("'", "")
    self.image_url = ("imgs/shoes/" + path)
  end

  before_save :generate_display_name, :generate_image_url


end
