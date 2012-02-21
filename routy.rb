# INCLUDES
require 'rubygems'
require 'sinatra'
require 'active_record'
require 'json'

# HELPERS
helpers do
  include Rack::Utils
  alias_method :h, :escape_html
end

# DB ADAPTER
configure :production do
  require 'uri'
  require 'pg'
  
  db = URI.parse(ENV['DATABASE_URL'])

  ActiveRecord::Base.establish_connection(
    :adapter  => db.scheme == 'postgres' ? 'postgresql' : db.scheme,
    :host     => db.host,
    :username => db.user,
    :password => db.password,
    :database => db.path[1..-1],
    :encoding => 'utf8'
  )
end

configure :development do
  require 'sqlite3'
  
  ActiveRecord::Base.establish_connection(
    :adapter => "sqlite3",
    :database => "routes.db"
  )
end

# MODEL
class Route < ActiveRecord::Base
  default_scope order('inbound DESC')
end

# ROUTES
get '/routes.json' do
  content_type :json
  Route.all.to_json
end

post '/routes/:id/delete' do |id|
  Route.destroy(id)
  redirect "/"
end

get '/' do
  @routes = Route.all
  erb :index
end

post '/' do
  begin
    unless params[:inbound] == '' and params[:outbound] == ''
      Route.create(:inbound => params[:inbound], :outbound => params[:outbound])
    end  
  rescue
  end
  @routes = Route.all
  erb :index
end

get '/tester' do
  erb :tester
end

post '/tester' do
  erb :tester
end

get '/download' do
  content_type :js
  attachment('routes.js')
  response.write(
    File.read(File.join('public', 'javascripts', 'plugins.js')) + 
    'var map = {"routes":' + Route.all.to_json + '};' + 
    File.read(File.join('public', 'javascripts', 'logic.js'))
  )
end
