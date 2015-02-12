class CreateVotes < ActiveRecord::Migration
  def change
    create_table :votes do |t|
      t.integer   :vote_count
      t.integer   :voter_id
      t.integer   :review_id

      t.timestamps
    end
  end
end
