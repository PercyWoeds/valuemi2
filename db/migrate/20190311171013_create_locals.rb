class CreateLocals < ActiveRecord::Migration
  def change
    create_table :locals do |t|
      t.string :code
      t.string :descrip

      t.timestamps null: false
    end
  end
end
