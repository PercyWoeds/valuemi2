{"changed":true,"filter":false,"title":"notes_controller.rb","tooltip":"/.c9/controllers/notes_controller.rb","value":"\nclass NotesController < ApplicationController\n  \n  before_action :set_note, only: [:show, :edit, :update, :destroy]\n  \n   $: << Dir.pwd + '/lib'\n   require 'pry'\n    require 'peru_sunat_ruc'\n  \n  lib = File.expand_path('../../../lib', __FILE__)\n        $LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)\n\n        require 'sunat'\n        require './config/config'\n        require './app/generators/invoice_generator'\n        require './app/generators/credit_note_generator'\n        require './app/generators/debit_note_generator'\n        require './app/generators/receipt_generator'\n        require './app/generators/daily_receipt_summary_generator'\n        require './app/generators/voided_documents_generator'\n        \n\n  \n  def procesar\n        \n        SUNAT.environment = :test \n        \n        files_to_clean = Dir.glob(\"*.xml\") + Dir.glob(\"./app/pdf_output/*.pdf\") + Dir.glob(\"*.zip\")\n        files_to_clean.each do |file|\n          File.delete(file)\n        end \n        \n     \n       \n        # grido solo \n        # bb04 market cargue datos hasta el 10-10\n        # cambiar unidad a zz\n        # bb02 en chequeo \n        \n        $unidad_medida = 'ZZ'\n        \n        @fecha1 = params[:fecha1]    \n        @fecha2 = params[:fecha2]\n    \n        @boleta = Note.where([\"fecha >= ? and fecha <= ? \", \"#{@fecha1} 00:00:00\",\"#{@fecha2} 23:59:59\"] )\n\n#         @boleta = Note.select(\"id,fecha,serie,numero,cod_cli,td,ruc,precio,precio_sigv,cod_prod,SUM(cantidad) as cantidad, SUM(importe) as importe\").where([\"fecha >= ? and fecha <= ? and importe >= 0 and procesado = ? and serie = ? \", \"#{@fecha1} 00:00:00\",\"#{@fecha2} 23:59:59\",\"0\",\"BX01\"] ).group(:fecha,:serie,:numero)\n      \n        for invoice in @boleta\n        \n                  \n                  $lcAutorizacion = \"\"\n                  $lcCuentas=\" \"  \n\n\n                  invoice[:procesado] = \"1\"\n                invoice.save \n         end   \n\n  end \n  \n  \n  # GET /notes\n  # GET /notes.json\n  def index\n      @notes = Note.all.paginate(:page => params[:page]).where(\"fecha>=? and fecha<= ?\",\"2019-01-01 00:00:00\",\"2019-12-31 23:59:59\").order(\"fecha DESC\",\"serie \",\"NUMERO DESC\")\n      @notes2 = Note.where(\"fecha>=? and fecha<= ?\",\"2019-05-01 00:00:00\",\"2019-12-31 23:59:59\").order(\"fecha DESC\",\"serie \",\"NUMERO DESC\") \n      @fecha1 = params[:fecha1]\n      @fecha2 = params[:fecha2]\n      @location = params[:location]\n      \n     \n      case @location \n      when \"1\" then \n        begin \n        \n         @notes = Note.all.paginate(:page => params[:page]).where(\"fecha>=? and fecha<= ? and SUBSTRING (serie, 2, 1)=? \", \"#{@fecha1} 00:00:00\",\"#{@fecha2} 23:59:59\",\"0\").order(\"fecha DESC\",\"serie\",\"NUMERO DESC\")\n    \n        end   \n      when \"2\" then\n        begin \n         \n         @notes = Note.all.paginate(:page => params[:page]).where(\"fecha>=? and fecha<= ? and SUBSTRING (serie, 2, 1)=? \", \"#{@fecha1} 00:00:00\",\"#{@fecha2} 23:59:59\",\"1\").order(\"fecha DESC\",\"serie\",\"NUMERO DESC\")\n    \n       end \n       \n      else \n        begin \n         @notes = Note.all.paginate(:page => params[:page]).where(\"fecha>=? and fecha<= ?\",@fecha1,@fecha2).order(\"fecha DESC\",\"serie \",\"NUMERO DESC\")\n       end \n    end\n      \n      respond_to do |format|\n    format.html\n    format.csv { send_data @notes2.to_csv, filename: \"Notes-#{Date.today}.csv\" }\n    end\n    \n    \n    \n  end\n\n  # GET /notes/1\n  # GET /notes/1.jso\n  def show\n  end\n\n  # GET /notes/new\n  def new\n    @note = Note.new\n  end\n\n  # GET /notes/1/edit\n  def edit\n  end\n\n  # POST /notes\n  # POST /notes.json\n  def create\n    @note = Note.new(note_params)\n\n    respond_to do |format|\n      if @note.save\n        format.html { redirect_to @note, notice: 'Note was successfully created.' }\n        format.json { render :show, status: :created, location: @note }\n      else\n        format.html { render :new }\n        format.json { render json: @note.errors, status: :unprocessable_entity }\n      end\n    end\n  end\n\n  # PATCH/PUT /notes/1\n  # PATCH/PUT /notes/1.json\n  def update\n    respond_to do |format|\n      if @note.update(note_params)\n        format.html { redirect_to @note, notice: 'Note was successfully updated.' }\n        format.json { render :show, status: :ok, location: @note }\n      else\n        format.html { render :edit }\n        format.json { render json: @note.errors, status: :unprocessable_entity }\n      end\n    end\n  end\n\n  # DELETE /notes/1\n  # DELETE /notes/1.json\n  def destroy\n    @note.destroy\n    respond_to do |format|\n      format.html { redirect_to notes_url, notice: 'Note was successfully destroyed.' }\n      format.json { head :no_content }\n    end\n  end\n  \n\tdef import\n      \n\t     Note.import(params[:file])\n       redirect_to root_url, notice: \"Boletas importadas.\"\n  end \n  \n  \n  \n    def print\n        @invoice = Note.find(params[:id])\n        \n        lib = File.expand_path('../../../lib', __FILE__)\n        $LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)\n        \n\n        require 'sunat'\n        require './config/config'\n        require './app/generators/invoice_generator'\n        require './app/generators/credit_note_generator'\n        require './app/generators/debit_note_generator'\n        require './app/generators/receipt_generator'\n        require './app/generators/daily_receipt_summary_generator'\n        require './app/generators/voided_documents_generator'\n\n        SUNAT.environment = :test \n\n        files_to_clean = Dir.glob(\"*.xml\") + Dir.glob(\"./app/pdf_output/*.pdf\") + Dir.glob(\"*.zip\")\n        files_to_clean.each do |file|\n          File.delete(file)\n        end         \n        \n        $lcFileName=\"\"\n        $lcFileName1=\"\"\n        \n       if @invoice.td==\"B\"\n      \n       else        \n           case_3  = InvoiceGenerator.new(1,3,1,@invoice.serie,@invoice.numero).with_igv2(true)\n        end \n        \n        puts \"nam file\"\n  \n        $lcFileName1=File.expand_path('../../../', __FILE__)+ \"/\"+$lcFileName\n        #$lcFileName1= \"/app/app/pdf_output/\"+$lcFileName\n        file_path =  $lcFileName1\n        \n        send_file(\"#{$lcFileName1}\", :type => 'application/pdf',:disposition => 'inline')  \n\n        @@document_serial_id =\"\"\n        $aviso=\"\"\n    end \n\n    \n  \n  def reporte_venta_dia \n    \n    \n    @fecha1 = params[:fecha1]    \n    @fecha2 = params[:fecha2]    \n    @note = Note.all.first \n    \n    @facturas_rpt = @note.get_facturas_day(@fecha1,@fecha2,\"0\")          \n    @facturas_rpt2 = @note.get_facturas_day(@fecha1,@fecha2,\"1\")   \n    \n    if  @facturas_rpt.first != nil \n          @total_villa = @facturas_rpt.first.get_facturas_eess(@fecha1,@fecha2,\"0\")\n         \n        else\n          @total_villa = 0\n         \n    end\n     \n    if  @facturas_rpt2.first != nil \n        \n          @total_lurin = @facturas_rpt2.first.get_facturas_eess(@fecha1,@fecha2,\"1\")\n        else\n         \n          @total_lurin = 0\n    end\n    case params[:print]\n      when \"To PDF\" then \n        begin \n          render  pdf: \"Facturas \",template: \"reports/rventas_rpt.pdf.erb\",locals: {:facturas => @facturas_rpt},\n             :page_size => \"A4\"\n        \n        end   \n      when \"To Excel\" then render xlsx: 'rventas_rpt_xls'\n      else render action: \"index\"\n    end\n  end\n  \ndef download_pdf\n  send_file \"#{Rails.root}/app/assets/docs/Физика.pdf\", type: \"application/pdf\", x_sendfile: true\nend\n\n\n  private\n    # Use callbacks to share common setup or constraints between actions.\n    def set_note\n      @note = Note.find(params[:id])\n    end\n\n    # Never trust parameters from the scary internet, only allow the white list through.\n    def note_params\n      params.require(:note).permit(:td, :fecha, :turno, :cod_emp, :caja, :serie, :numero, :cod_cli, :ruc, :placa, :odometro, :cod_prod, :cantidad, :precio, :importe, :igv, :fpago)\n    end\nend\n\n\n","undoManager":{"mark":97,"position":100,"stack":[[{"start":{"row":198,"column":26},"end":{"row":198,"column":27},"action":"remove","lines":["e"],"id":385}],[{"start":{"row":198,"column":25},"end":{"row":198,"column":26},"action":"remove","lines":["."],"id":386}],[{"start":{"row":198,"column":24},"end":{"row":198,"column":25},"action":"remove","lines":["e"],"id":387}],[{"start":{"row":198,"column":23},"end":{"row":198,"column":24},"action":"remove","lines":["l"],"id":388}],[{"start":{"row":198,"column":22},"end":{"row":198,"column":23},"action":"remove","lines":["i"],"id":389}],[{"start":{"row":198,"column":21},"end":{"row":198,"column":22},"action":"remove","lines":["F"],"id":390}],[{"start":{"row":198,"column":24},"end":{"row":198,"column":25},"action":"insert","lines":["a"],"id":391}],[{"start":{"row":198,"column":25},"end":{"row":198,"column":26},"action":"insert","lines":["p"],"id":392}],[{"start":{"row":198,"column":26},"end":{"row":198,"column":27},"action":"insert","lines":["p"],"id":393}],[{"start":{"row":198,"column":27},"end":{"row":198,"column":28},"action":"insert","lines":["/"],"id":394}],[{"start":{"row":198,"column":28},"end":{"row":198,"column":29},"action":"insert","lines":["a"],"id":395}],[{"start":{"row":198,"column":29},"end":{"row":198,"column":30},"action":"insert","lines":["p"],"id":396}],[{"start":{"row":198,"column":30},"end":{"row":198,"column":31},"action":"insert","lines":["p"],"id":397}],[{"start":{"row":198,"column":31},"end":{"row":198,"column":32},"action":"insert","lines":["/"],"id":398}],[{"start":{"row":198,"column":32},"end":{"row":198,"column":33},"action":"insert","lines":["p"],"id":399}],[{"start":{"row":198,"column":33},"end":{"row":198,"column":34},"action":"insert","lines":["d"],"id":400}],[{"start":{"row":198,"column":34},"end":{"row":198,"column":35},"action":"insert","lines":["t"],"id":401}],[{"start":{"row":198,"column":34},"end":{"row":198,"column":35},"action":"remove","lines":["t"],"id":402}],[{"start":{"row":198,"column":34},"end":{"row":198,"column":35},"action":"insert","lines":["t"],"id":403}],[{"start":{"row":198,"column":34},"end":{"row":198,"column":35},"action":"remove","lines":["t"],"id":404}],[{"start":{"row":198,"column":33},"end":{"row":198,"column":34},"action":"remove","lines":["d"],"id":405}],[{"start":{"row":198,"column":33},"end":{"row":198,"column":34},"action":"insert","lines":["d"],"id":406}],[{"start":{"row":198,"column":34},"end":{"row":198,"column":35},"action":"insert","lines":["f"],"id":407}],[{"start":{"row":198,"column":35},"end":{"row":198,"column":36},"action":"insert","lines":["_"],"id":408}],[{"start":{"row":198,"column":36},"end":{"row":198,"column":37},"action":"insert","lines":["o"],"id":409}],[{"start":{"row":198,"column":37},"end":{"row":198,"column":38},"action":"insert","lines":["u"],"id":410}],[{"start":{"row":198,"column":32},"end":{"row":198,"column":38},"action":"remove","lines":["pdf_ou"],"id":411},{"start":{"row":198,"column":32},"end":{"row":198,"column":42},"action":"insert","lines":["pdf_output"]}],[{"start":{"row":198,"column":42},"end":{"row":198,"column":43},"action":"insert","lines":["/"],"id":412}],[{"start":{"row":198,"column":8},"end":{"row":198,"column":9},"action":"insert","lines":["#"],"id":413}],[{"start":{"row":197,"column":8},"end":{"row":197,"column":9},"action":"remove","lines":["#"],"id":414}],[{"start":{"row":199,"column":25},"end":{"row":200,"column":0},"action":"insert","lines":["",""],"id":415},{"start":{"row":200,"column":0},"end":{"row":200,"column":8},"action":"insert","lines":["        "]}],[{"start":{"row":200,"column":8},"end":{"row":201,"column":0},"action":"insert","lines":["",""],"id":416},{"start":{"row":201,"column":0},"end":{"row":201,"column":8},"action":"insert","lines":["        "]}],[{"start":{"row":200,"column":8},"end":{"row":202,"column":3},"action":"insert","lines":["File.open(file_path, 'r') do |f|","  send_data f.read","end"],"id":417}],[{"start":{"row":201,"column":0},"end":{"row":201,"column":2},"action":"insert","lines":["  "],"id":418}],[{"start":{"row":201,"column":2},"end":{"row":201,"column":4},"action":"insert","lines":["  "],"id":419}],[{"start":{"row":201,"column":4},"end":{"row":201,"column":6},"action":"insert","lines":["  "],"id":420}],[{"start":{"row":201,"column":6},"end":{"row":201,"column":8},"action":"insert","lines":["  "],"id":421}],[{"start":{"row":202,"column":0},"end":{"row":202,"column":2},"action":"insert","lines":["  "],"id":422}],[{"start":{"row":202,"column":2},"end":{"row":202,"column":4},"action":"insert","lines":["  "],"id":423}],[{"start":{"row":202,"column":4},"end":{"row":202,"column":6},"action":"insert","lines":["  "],"id":424}],[{"start":{"row":199,"column":11},"end":{"row":199,"column":12},"action":"remove","lines":["s"],"id":425}],[{"start":{"row":199,"column":10},"end":{"row":199,"column":11},"action":"remove","lines":["t"],"id":426}],[{"start":{"row":199,"column":9},"end":{"row":199,"column":10},"action":"remove","lines":["u"],"id":427}],[{"start":{"row":199,"column":8},"end":{"row":199,"column":9},"action":"remove","lines":["p"],"id":428}],[{"start":{"row":199,"column":8},"end":{"row":199,"column":9},"action":"insert","lines":["f"],"id":429}],[{"start":{"row":199,"column":9},"end":{"row":199,"column":10},"action":"insert","lines":["i"],"id":430}],[{"start":{"row":199,"column":10},"end":{"row":199,"column":11},"action":"insert","lines":["l"],"id":431}],[{"start":{"row":199,"column":11},"end":{"row":199,"column":12},"action":"insert","lines":["e"],"id":432}],[{"start":{"row":199,"column":8},"end":{"row":199,"column":12},"action":"remove","lines":["file"],"id":433},{"start":{"row":199,"column":8},"end":{"row":199,"column":17},"action":"insert","lines":["file_path"]}],[{"start":{"row":199,"column":17},"end":{"row":199,"column":18},"action":"insert","lines":[" "],"id":434}],[{"start":{"row":199,"column":18},"end":{"row":199,"column":19},"action":"insert","lines":["="],"id":435}],[{"start":{"row":199,"column":19},"end":{"row":199,"column":20},"action":"insert","lines":[" "],"id":436}],[{"start":{"row":202,"column":6},"end":{"row":202,"column":8},"action":"insert","lines":["  "],"id":437}],[{"start":{"row":205,"column":8},"end":{"row":205,"column":9},"action":"insert","lines":["#"],"id":438}],[{"start":{"row":200,"column":6},"end":{"row":204,"column":6},"action":"remove","lines":["  File.open(file_path, 'r') do |f|","          send_data f.read","        end","        ","      "],"id":439}],[{"start":{"row":201,"column":8},"end":{"row":201,"column":9},"action":"remove","lines":["#"],"id":440}],[{"start":{"row":201,"column":79},"end":{"row":201,"column":80},"action":"remove","lines":["c"],"id":441}],[{"start":{"row":201,"column":78},"end":{"row":201,"column":79},"action":"remove","lines":["o"],"id":442}],[{"start":{"row":201,"column":77},"end":{"row":201,"column":78},"action":"remove","lines":["d"],"id":443}],[{"start":{"row":201,"column":76},"end":{"row":201,"column":77},"action":"remove","lines":["/"],"id":444}],[{"start":{"row":201,"column":75},"end":{"row":201,"column":76},"action":"remove","lines":["m"],"id":445}],[{"start":{"row":201,"column":74},"end":{"row":201,"column":75},"action":"remove","lines":["t"],"id":446}],[{"start":{"row":201,"column":73},"end":{"row":201,"column":74},"action":"remove","lines":["h"],"id":447}],[{"start":{"row":201,"column":72},"end":{"row":201,"column":73},"action":"remove","lines":["/"],"id":448}],[{"start":{"row":201,"column":71},"end":{"row":201,"column":72},"action":"remove","lines":["l"],"id":449}],[{"start":{"row":201,"column":70},"end":{"row":201,"column":71},"action":"remove","lines":["m"],"id":450}],[{"start":{"row":201,"column":69},"end":{"row":201,"column":70},"action":"remove","lines":["t"],"id":451}],[{"start":{"row":201,"column":68},"end":{"row":201,"column":69},"action":"remove","lines":["h"],"id":452}],[{"start":{"row":201,"column":67},"end":{"row":201,"column":68},"action":"remove","lines":["/"],"id":453}],[{"start":{"row":201,"column":66},"end":{"row":201,"column":67},"action":"remove","lines":["x"],"id":454}],[{"start":{"row":201,"column":65},"end":{"row":201,"column":66},"action":"remove","lines":["c"],"id":455}],[{"start":{"row":201,"column":64},"end":{"row":201,"column":65},"action":"remove","lines":["o"],"id":456}],[{"start":{"row":201,"column":63},"end":{"row":201,"column":64},"action":"remove","lines":["d"],"id":457}],[{"start":{"row":201,"column":62},"end":{"row":201,"column":63},"action":"remove","lines":["/"],"id":458}],[{"start":{"row":201,"column":61},"end":{"row":201,"column":62},"action":"remove","lines":["f"],"id":459}],[{"start":{"row":201,"column":61},"end":{"row":201,"column":62},"action":"insert","lines":["f"],"id":460}],[{"start":{"row":201,"column":90},"end":{"row":201,"column":91},"action":"remove","lines":["t"],"id":461}],[{"start":{"row":201,"column":89},"end":{"row":201,"column":90},"action":"remove","lines":["n"],"id":462}],[{"start":{"row":201,"column":88},"end":{"row":201,"column":89},"action":"remove","lines":["e"],"id":463}],[{"start":{"row":201,"column":87},"end":{"row":201,"column":88},"action":"remove","lines":["m"],"id":464}],[{"start":{"row":201,"column":86},"end":{"row":201,"column":87},"action":"remove","lines":["h"],"id":465}],[{"start":{"row":201,"column":85},"end":{"row":201,"column":86},"action":"remove","lines":["c"],"id":466}],[{"start":{"row":201,"column":84},"end":{"row":201,"column":85},"action":"remove","lines":["a"],"id":467}],[{"start":{"row":201,"column":83},"end":{"row":201,"column":84},"action":"remove","lines":["t"],"id":468}],[{"start":{"row":201,"column":82},"end":{"row":201,"column":83},"action":"remove","lines":["t"],"id":469}],[{"start":{"row":201,"column":81},"end":{"row":201,"column":82},"action":"remove","lines":["a"],"id":470}],[{"start":{"row":201,"column":81},"end":{"row":201,"column":82},"action":"insert","lines":["i"],"id":471}],[{"start":{"row":201,"column":82},"end":{"row":201,"column":83},"action":"insert","lines":["n"],"id":472}],[{"start":{"row":201,"column":83},"end":{"row":201,"column":84},"action":"insert","lines":["l"],"id":473}],[{"start":{"row":201,"column":84},"end":{"row":201,"column":85},"action":"insert","lines":["i"],"id":474}],[{"start":{"row":201,"column":85},"end":{"row":201,"column":86},"action":"insert","lines":["o"],"id":475}],[{"start":{"row":201,"column":86},"end":{"row":201,"column":87},"action":"insert","lines":["e"],"id":476}],[{"start":{"row":201,"column":86},"end":{"row":201,"column":87},"action":"remove","lines":["e"],"id":477}],[{"start":{"row":201,"column":85},"end":{"row":201,"column":86},"action":"remove","lines":["o"],"id":478}],[{"start":{"row":201,"column":85},"end":{"row":201,"column":86},"action":"insert","lines":["n"],"id":479}],[{"start":{"row":201,"column":86},"end":{"row":201,"column":87},"action":"insert","lines":["e"],"id":480}],[{"start":{"row":201,"column":2},"end":{"row":201,"column":3},"action":"insert","lines":["#"],"id":481}],[{"start":{"row":201,"column":2},"end":{"row":201,"column":3},"action":"remove","lines":["#"],"id":482}],[{"start":{"row":260,"column":0},"end":{"row":261,"column":0},"action":"insert","lines":["",""],"id":483}],[{"start":{"row":261,"column":0},"end":{"row":262,"column":0},"action":"insert","lines":["",""],"id":484}],[{"start":{"row":246,"column":0},"end":{"row":248,"column":3},"action":"insert","lines":["def download_pdf","  send_file \"#{Rails.root}/app/assets/docs/Физика.pdf\", type: \"application/pdf\", x_sendfile: true","end"],"id":485}]]},"ace":{"folds":[],"scrolltop":2660,"scrollleft":0,"selection":{"start":{"row":202,"column":0},"end":{"row":202,"column":0},"isBackwards":true},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":189,"state":"start","mode":"ace/mode/ruby"}},"timestamp":1558139329841}