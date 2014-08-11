class ChibsController < ApplicationController
  before_action :set_chib, only: [:show, :edit, :update, :destroy]

  # GET /chibs
  # GET /chibs.json
  def index
    @chibs = Chib.all
  end

  # GET /chibs/1
  # GET /chibs/1.json
  def show
  end

  # GET /chibs/new
  def new
    @chib = Chib.new
  end

  # GET /chibs/1/edit
  def edit
  end

  # POST /chibs
  # POST /chibs.json
  def create
    @chib = Chib.new(chib_params)

    respond_to do |format|
      if @chib.save
        format.html { redirect_to @chib, notice: 'Chib was successfully created.' }
        format.json { render :show, status: :created, location: @chib }
      else
        format.html { render :new }
        format.json { render json: @chib.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /chibs/1
  # PATCH/PUT /chibs/1.json
  def update
    respond_to do |format|
      if @chib.update(chib_params)
        format.html { redirect_to @chib, notice: 'Chib was successfully updated.' }
        format.json { render :show, status: :ok, location: @chib }
      else
        format.html { render :edit }
        format.json { render json: @chib.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /chibs/1
  # DELETE /chibs/1.json
  def destroy
    @chib.destroy
    respond_to do |format|
      format.html { redirect_to chibs_url, notice: 'Chib was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_chib
      @chib = Chib.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def chib_params
      params.require(:chib).permit(:level_id, :user_id, :mochi, :color)
    end
end
