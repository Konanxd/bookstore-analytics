from app.utils.database import db

class Pengiriman(db.Model):
    __tablename__ = 'pengiriman'

    id_pengiriman = db.Column(db.Integer, primary_key=True)
    id_pembayaran = db.Column(db.Integer, db.ForeignKey('pembayaran.id_pembayaran'), nullable=False)
    id_pesanan = db.Column(db.Integer, db.ForeignKey('pesanan.id_pesanan'), nullable=False)
    id_pelanggan = db.Column(db.Integer, db.ForeignKey('pelanggan.id_pelanggan'), nullable=False)
    tanggal_pengiriman = db.Column(db.Date)
    stat_pengiriman = db.Column(db.String(20), nullable=False)
    no_res = db.Column(db.String(50), nullable=False)

    pembayaran = db.relationship("Pembayaran", backref="pengiriman")
    pesanan = db.relationship("Pesanan", backref="pengiriman")
    pelanggan = db.relationship("Pelanggan", backref="pengiriman")

    def to_dict(self):
        return {
            'id_pengiriman': self.id_pengiriman,
            'id_pembayaran': self.id_pembayaran,
            'id_pesanan': self.id_pesanan,
            'id_pelanggan': self.id_pelanggan,
            'tanggal_pengiriman': self.tanggal_pengiriman.strftime('%Y-%m-%d'),
            'stat_pengiriman': self.stat_pengiriman,
            'no_res': self.no_res
        }