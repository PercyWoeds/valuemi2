{"changed":true,"filter":false,"title":"final.rb","tooltip":"/final.rb","value":" lib = File.expand_path('../lib', __FILE__)\n$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)\nputs lib\n\nrequire 'sunat'\nrequire './config/config'\nrequire './app/generators/invoice_generator'\nrequire './app/generators/credit_note_generator'\nrequire './app/generators/debit_note_generator'\nrequire './app/generators/receipt_generator'\nrequire './app/generators/daily_receipt_summary_generator'\nrequire './app/generators/voided_documents_generator'\n\nSUNAT.environment = :test\n\n\nfiles_to_clean = Dir.glob(\"*.xml\") + Dir.glob(\"./app/pdf_output/*.pdf\") + Dir.glob(\"*.zip\")\nfiles_to_clean.each do |file|\n  File.delete(file)\nend \n\n\ncase_49 = InvoiceGenerator.new(1, 3, 1, \"FF02\").with_different_currency\n\n\n\n\n#case_6 = CreditNoteGenerator.new(1, 6, \"FF01\").for_igv_document(case_3,true)\n# case_6 = CreditNoteGenerator.new(1, 6, \"FF01\").for_igv_document(true)\n\n#case_6 = CreditNoteGenerator.new(1, 6, \"FF01\").for_igv_document(true)\n#VoidedDocumentsGenerator.new.generate\n\n#Resumen Diario boletas de venta 13\n#if groups.include?(13)\n # DailyReceiptSummaryGenerator.new.generate\n#end\n\n#Comunicacion de baja 14\n#if groups.include?(14)\n  #VoidedDocumentsGenerator.new.generate\n#end\n\n\n\n\n","undoManager":{"mark":10,"position":16,"stack":[[{"start":{"row":22,"column":30},"end":{"row":22,"column":31},"action":"remove","lines":["("],"id":173},{"start":{"row":22,"column":30},"end":{"row":22,"column":31},"action":"insert","lines":["1"]}],[{"start":{"row":22,"column":31},"end":{"row":22,"column":32},"action":"remove","lines":["7"],"id":174}],[{"start":{"row":22,"column":30},"end":{"row":22,"column":31},"action":"remove","lines":["1"],"id":175}],[{"start":{"row":22,"column":30},"end":{"row":22,"column":32},"action":"insert","lines":["()"],"id":176}],[{"start":{"row":22,"column":31},"end":{"row":22,"column":32},"action":"insert","lines":["1"],"id":177}],[{"start":{"row":22,"column":32},"end":{"row":22,"column":33},"action":"remove","lines":[")"],"id":178}],[{"start":{"row":22,"column":34},"end":{"row":22,"column":35},"action":"remove","lines":["4"],"id":179}],[{"start":{"row":22,"column":34},"end":{"row":22,"column":35},"action":"remove","lines":["9"],"id":180}],[{"start":{"row":22,"column":34},"end":{"row":22,"column":35},"action":"insert","lines":["3"],"id":181}],[{"start":{"row":22,"column":37},"end":{"row":22,"column":38},"action":"remove","lines":["5"],"id":182}],[{"start":{"row":22,"column":37},"end":{"row":22,"column":38},"action":"insert","lines":["1"],"id":183}],[{"start":{"row":15,"column":0},"end":{"row":15,"column":1},"action":"insert","lines":["1"],"id":184}],[{"start":{"row":15,"column":0},"end":{"row":15,"column":1},"action":"remove","lines":["1"],"id":185}],[{"start":{"row":15,"column":0},"end":{"row":15,"column":1},"action":"insert","lines":["/"],"id":186}],[{"start":{"row":15,"column":0},"end":{"row":15,"column":1},"action":"remove","lines":["/"],"id":187}],[{"start":{"row":15,"column":0},"end":{"row":15,"column":1},"action":"insert","lines":["/"],"id":188}],[{"start":{"row":15,"column":0},"end":{"row":15,"column":1},"action":"remove","lines":["/"],"id":189}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":15,"column":0},"end":{"row":15,"column":0},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1498603091000}