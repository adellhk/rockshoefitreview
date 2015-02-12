class CreateFootProfiles < ActiveRecord::Migration
  def change
    create_table :foot_profiles do |t|
      t.integer     :forefoot_width
      t.integer     :heel_width
      t.integer     :foot_length

      t.integer     :user_id

      t.timestamps
    end
  end
end