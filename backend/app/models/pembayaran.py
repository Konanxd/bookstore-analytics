from app.utils.database import db

class Pembayaran(db.Model):
    __tablename__ = 'pembayaran'

    id_pembayaran = db.Column(db.Integer, primary_key=True)
    id_pesanan = db.Column(db.Integer, db.ForeignKey('pesanan.id_pesanan'), nullable=False)
    id_pelanggan = db.Column(db.Integer, db.ForeignKey('pelanggan.id_pelanggan'), nullable=False)
    tanggal_pembayaran = db.Column(db.Date)
    total_pembayaran = db.Column(db.Float, nullable=False)
    stat_bayar = db.Column(db.String(20), nullable=False)

    pesanan = db.relationship("Pesanan", backref="pembayaran")
    pelanggan = db.relationship("Pelanggan", backref="pembayaran")


    def to_dict(self):
        return {
            'id_pembayaran': self.id_pembayaran,
            'id_pesanan': self.id_pesanan,
            'id_pelanggan': self.id_pelanggan,
            'tanggal_pembayaran': self.tanggal_pembayaran.strftime('%Y-%m-%d'),
            'total_pembayaran': self.total_pembayaran,
            'stat_bayar': self.stat_bayar
        }