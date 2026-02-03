export interface KopSurat {
    logo: string;
    namaPerusahaan: string;
    alamatPerusahaan: string;
    noTelp: string;
    email: string;
    website: string;
}

export interface Pihak {
    nama: string;
    jabatan: string;
    noHP: string;
    email: string;
}

export interface SuratBeritaAcaraData {
    kopSurat: KopSurat;
    informasiSurat: {
        judul: string;
        nomorSurat: string;
        tempat: string;
        tanggal: string;
    };
    pihakPembuat: Pihak;
    pihakTujuan: Pihak;
    isiBeritaAcara: string[];
    paragrafPenutup: string;
    ttd: {
        gambar: string;
        namaPenandatangan: string;
        stempel: string;
    };
}

export interface HistoryItem {
    id: string;
    label: string;
    timestamp: number;
    data: SuratBeritaAcaraData;
}
