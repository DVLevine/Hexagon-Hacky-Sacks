class RaindropsController < ApplicationController
  before_action :set_raindrop, only: [:show, :edit, :update, :destroy]

  # GET /raindrops
  # GET /raindrops.json
  def index
    @raindrops = Raindrop.all
  end

  # GET /raindrops/1
  # GET /raindrops/1.json
  def show
  end

  # GET /raindrops/new
  def new
    @raindrop = Raindrop.new
  end

  # GET /raindrops/1/edit
  def edit
  end

  # POST /raindrops
  # POST /raindrops.json
  def create
    @raindrop = Raindrop.new(raindrop_params)

    respond_to do |format|
      if @raindrop.save
        format.html { redirect_to @raindrop, notice: 'Raindrop was successfully created.' }
        format.json { render :show, status: :created, location: @raindrop }
      else
        format.html { render :new }
        format.json { render json: @raindrop.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /raindrops/1
  # PATCH/PUT /raindrops/1.json
  def update
    respond_to do |format|
      if @raindrop.update(raindrop_params)
        format.html { redirect_to @raindrop, notice: 'Raindrop was successfully updated.' }
        format.json { render :show, status: :ok, location: @raindrop }
      else
        format.html { render :edit }
        format.json { render json: @raindrop.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /raindrops/1
  # DELETE /raindrops/1.json
  def destroy
    @raindrop.destroy
    respond_to do |format|
      format.html { redirect_to raindrops_url, notice: 'Raindrop was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_raindrop
      @raindrop = Raindrop.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def raindrop_params
      params.require(:raindrop).permit(:water, :shiny)
    end
end
