Rails.application.configure do
    # Settings specified here will take precedence over those in config/application.rb.

  # Code is not reloaded between requests.
  config.cache_classes = true

  
  config.eager_load = true

  # Full error reports are disabled and caching is turned on.
  config.consider_all_requests_local       = false
  config.action_controller.perform_caching = true

  
  config.serve_static_files = true
 
  # Compress JavaScripts and CSS.
  config.assets.js_compressor = :uglifier
  # config.assets.css_compressor = :sass

  # Do not fallback to assets pipeline if a precompiled asset is missed.
  config.assets.compile = false

  # Asset digests allow you to set far-future HTTP expiration dates on all assets,
  # yet still be able to expire them through the digest params.
  config.assets.digest = true
  config.action_dispatch.x_sendfile_header = "X-Sendfile"
  # `config.assets.precompile` and `config.assets.version` have moved to config/initializers/assets.rb

  config.log_level = :debug

  
  config.i18n.fallbacks = true

  # Send deprecation notices to registered listeners.
  config.active_support.deprecation = :notify

  # Use default logging formatter so that PID and timestamp are not suppressed.
  config.log_formatter = ::Logger::Formatter.new

  # Do not dump schema after migrations.
  config.active_record.dump_schema_after_migration = false

  config.action_mailer.delivery_method = :smtp
  
 config.action_mailer.smtp_settings = {
    address:              'send.one.com',
    port:                 587,
    domain:               'one.com',
    user_name:            'factura-electronica@valuemiperu.com',
    password:             'Factura2016',
    authentication:       'plain',
    enable_starttls_auto: true  }

    
end
