from app.routes.penulis_routes import penulis_routes
from app.routes.penerbit_routes import penerbit_routes
from app.routes.genre_routes import genre_routes
from app.routes.buku_routes import buku_routes
from app.routes.pelanggan_routes import pelanggan_routes
from app.routes.pesanan_routes import pesanan_routes
from app.routes.pembayaran_routes import pembayaran_routes
from app.routes.pengiriman_routes import pengiriman_routes
from app.routes.stats_routes import stats_routes

def register_routes(app):
    app.register_blueprint(penulis_routes, url_prefix="/api")
    app.register_blueprint(penerbit_routes, url_prefix="/api")
    app.register_blueprint(genre_routes, url_prefix="/api")
    app.register_blueprint(buku_routes, url_prefix="/api")
    app.register_blueprint(pelanggan_routes, url_prefix="/api")
    app.register_blueprint(pesanan_routes, url_prefix="/api")
    app.register_blueprint(pembayaran_routes, url_prefix="/api")
    app.register_blueprint(pengiriman_routes, url_prefix="/api")
    app.register_blueprint(stats_routes, url_prefix="/api")
