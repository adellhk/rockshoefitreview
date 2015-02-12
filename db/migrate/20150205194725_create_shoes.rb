class CreateShoes < ActiveRecord::Migration
  def change
    create_table :shoes do |t|
      t.string    :brand
      t.string    :model
      t.integer   :price
      t.integer   :size
      t.string   :display_name

      t.timestamps
    end
  end
end
