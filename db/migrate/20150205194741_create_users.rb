class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string    :username
      t.integer   :foot_profile
      t.string    :email
      t.string    :fb_id

      t.timestamps
    end
  end
end
