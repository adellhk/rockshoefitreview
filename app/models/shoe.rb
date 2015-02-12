class Shoe < ActiveRecord::Base
  has_many :reviews

  def generate_display_name
    self.display_name = self.brand + " " + self.model
  end

  def image_path
    path = generate_display_name
    path.gsub(" ", "-").gsub("\'", "")
  end

  before_save :generate_display_name


end
