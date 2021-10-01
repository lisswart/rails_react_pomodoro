class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :firstname
      t.string :lastname
      t.string :username
      t.string :email
      t.string :password_digest
      t.integer :session_length
      t.integer :break_length
      t.boolean :enable_long_break
      t.integer :no_of_sessions_before_long_break
      t.integer :long_break_length

      t.timestamps
    end
  end
end
