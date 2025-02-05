from app.routes.buku_routes import buku_routes
from app.routes.pelanggan_routes import pelanggan_routes
from app.routes.pesanan_routes import pesanan_routes
from app.routes.pembayaran_routes import pembayaran_routes
from app.routes.pengiriman_routes import pengiriman_routes
from app.routes.stats_routes import stats_routes

def register_routes(app):
    app.register_blueprint(buku_routes, url_prefix="/api")
    app.register_blueprint(pelanggan_routes, url_prefix="/api")
    app.register_blueprint(pesanan_routes, url_prefix="/api")
    app.register_blueprint(pembayaran_routes, url_prefix="/api")
    app.register_blueprint(pengiriman_routes, url_prefix="/api")
    app.register_blueprint(stats_routes, url_prefix="/api")
