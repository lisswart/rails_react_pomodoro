class AddDatesToTimeEntries < ActiveRecord::Migration[6.1]
  def change
    add_column :time_entries, :time_posted, :date
  end
end
