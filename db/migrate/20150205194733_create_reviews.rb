class CreateReviews < ActiveRecord::Migration
  def change
    create_table  :reviews do |t|
      t.integer   :author_id
      t.string    :message
      t.boolean   :fits
      t.integer   :votes
      t.integer   :shoe_id

      t.timestamps
    end
  end
end
