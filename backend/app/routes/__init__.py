from app.routes.book_routes import book_bp
from app.routes.pelanggan_routes import pelanggan_routes
from app.routes.pesanan_routes import pesanan_routes
from app.routes.pembayaran_routes import pembayaran_routes
from app.routes.pengiriman_routes import pengiriman_routes

def register_routes(app):
    app.register_blueprint(book_bp, url_prefix="/api")
    app.register_blueprint(pelanggan_routes, url_prefix="/api")
    app.register_blueprint(pesanan_routes, url_prefix="/api")
    app.register_blueprint(pembayaran_routes, url_prefix="/api")
    app.register_blueprint(pengiriman_routes, url_prefix="/api")
