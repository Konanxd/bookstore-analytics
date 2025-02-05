from app.utils.database import db

class Pesanan(db.Model):
    __tablename__ = 'pesanan'

    id_pesanan = db.Column(db.Integer, primary_key=True)
    id_pelanggan = db.Column(db.Integer, db.ForeignKey('pelanggan.id_pelanggan'), nullable=False)
    id_buku = db.Column(db.Integer, db.ForeignKey('buku.id_buku'), nullable=False)
    jumlah_pesanan = db.Column(db.Integer, nullable=False)
    tanggal_pesanan = db.Column(db.Date)

    pelanggan = db.relationship("Pelanggan", backref="pesanan")
    buku = db.relationship("Buku", backref="pesanan")

    def to_dict(self):
        return {
            'id_pesanan': self.id_pesanan,
            'id_pelanggan': self.id_pelanggan,
            'id_buku': self.id_buku,
            'jumlah_pesanan': self.jumlah_pesanan,
            'tanggal_pesanan': self.tanggal_pesanan.strftime('%Y-%m-%d'),
        }