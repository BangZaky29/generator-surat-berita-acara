import React from 'react';
import type { SuratBeritaAcaraData } from '../types';

interface PreviewProps {
    data: SuratBeritaAcaraData;
}

const Preview: React.FC<PreviewProps> = ({ data }) => {
    const formatDate = (dateString: string) => {
        if (!dateString) return '....................';
        try {
            const date = new Date(dateString);
            return new Intl.DateTimeFormat('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            }).format(date);
        } catch {
            return dateString;
        }
    };

    return (
        <div id="surat-preview" className="a4-preview font-serif text-[#1e293b] leading-relaxed relative overflow-hidden">
            {/* Background Decor (not in PDF hopefully or subtle) */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full -mr-32 -mt-32 opacity-50 z-0"></div>

            <div className="relative z-10">
                {/* Kop Surat */}
                <div className="border-b-4 border-double border-slate-900 pb-4 mb-8 flex items-center gap-6">
                    {data.kopSurat.logo && (
                        <img src={data.kopSurat.logo} alt="Logo" className="w-24 h-24 object-contain" />
                    )}
                    <div className="flex-1 text-center">
                        <h1 className="text-2xl font-bold uppercase tracking-tight text-slate-900">{data.kopSurat.namaPerusahaan || 'NAMA PERUSAHAAN'}</h1>
                        <p className="text-xs mt-1 text-slate-600 italic">{data.kopSurat.alamatPerusahaan || 'Alamat Perusahaan Lengkap'}</p>
                        <div className="flex justify-center gap-4 text-[10px] mt-2 text-slate-500 font-medium">
                            {data.kopSurat.noTelp && <span>Telp: {data.kopSurat.noTelp}</span>}
                            {data.kopSurat.email && <span>Email: {data.kopSurat.email}</span>}
                            {data.kopSurat.website && <span>Web: {data.kopSurat.website}</span>}
                        </div>
                    </div>
                </div>

                {/* Judul & Nomor */}
                <div className="text-center mb-10">
                    <h2 className="text-xl font-bold uppercase underline tracking-widest">{data.informasiSurat.judul || 'BERITA ACARA'}</h2>
                    <p className="text-sm mt-1 font-bold tracking-wide">Nomor: {data.informasiSurat.nomorSurat || '.........................'}</p>
                </div>

                {/* Pembuka */}
                <div className="text-sm space-y-4 text-justify mb-8">
                    <p>
                        Pada hari ini <strong>{formatDate(data.informasiSurat.tanggal)}</strong>, bertempat di <strong>{data.informasiSurat.tempat || '....................'}</strong>, kami yang bertanda tangan di bawah ini:
                    </p>

                    <div className="space-y-3 pl-4">
                        <div className="flex">
                            <span className="w-32">Nama</span>
                            <span className="mr-2">:</span>
                            <span className="font-bold uppercase">{data.pihakPembuat.nama || '....................'}</span>
                        </div>
                        <div className="flex">
                            <span className="w-32">Pekerjaan/Jabatan</span>
                            <span className="mr-2">:</span>
                            <span>{data.pihakPembuat.jabatan || '....................'}</span>
                        </div>
                        {data.pihakPembuat.noHP && (
                            <div className="flex">
                                <span className="w-32">No. HP</span>
                                <span className="mr-2">:</span>
                                <span>{data.pihakPembuat.noHP}</span>
                            </div>
                        )}
                        <div className="mt-2 italic text-xs text-slate-500">Selanjutnya disebut sebagai <strong>Pihak Pertama</strong>.</div>
                    </div>

                    <p className="mt-4">Kepada:</p>

                    <div className="space-y-3 pl-4">
                        <div className="flex">
                            <span className="w-32">Nama/Perusahaan</span>
                            <span className="mr-2">:</span>
                            <span className="font-bold uppercase">{data.pihakTujuan.nama || '....................'}</span>
                        </div>
                        <div className="flex">
                            <span className="w-32">Pekerjaan/Jabatan</span>
                            <span className="mr-2">:</span>
                            <span>{data.pihakTujuan.jabatan || '....................'}</span>
                        </div>
                        {data.pihakTujuan.noHP && (
                            <div className="flex">
                                <span className="w-32">No. HP</span>
                                <span className="mr-2">:</span>
                                <span>{data.pihakTujuan.noHP}</span>
                            </div>
                        )}
                        <div className="mt-2 italic text-xs text-slate-500">Selanjutnya disebut sebagai <strong>Pihak Kedua</strong>.</div>
                    </div>
                </div>

                {/* Isi */}
                <div className="text-sm space-y-4 mb-8">
                    <p>Pihak Pertama telah menjelaskan rangkaian, Alur, Regulasi, Peristiwa dan Sejenisnya Sebagai Berikut:</p>
                    <ol className="list-decimal pl-8 space-y-3">
                        {data.isiBeritaAcara.length > 0 ? (
                            data.isiBeritaAcara.map((point, idx) => (
                                <li key={idx} className="text-justify leading-relaxed">{point || '....................................................................................'}</li>
                            ))
                        ) : (
                            <>
                                <li className="text-justify leading-relaxed">....................................................................................</li>
                                <li className="text-justify leading-relaxed">....................................................................................</li>
                            </>
                        )}
                    </ol>
                </div>

                {/* Penutup */}
                <div className="text-sm text-justify mb-12">
                    {data.paragrafPenutup.replace('{NomorSurat}', data.informasiSurat.nomorSurat || '.........................')}
                </div>

                {/* Tanda Tangan */}
                <div className="mt-16 flex justify-end">
                    <div className="w-64 text-center relative">
                        <p className="text-sm mb-2">{data.informasiSurat.tempat || 'Jakarta'}, {formatDate(data.informasiSurat.tanggal)}</p>
                        <div className="mt-4 h-32 flex items-center justify-center relative">
                            {/* Container for Signature & Stamp to overlap precisely */}
                            <div className="relative w-48 h-full flex items-center justify-center">
                                {data.ttd.gambar && (
                                    <img src={data.ttd.gambar} alt="TTD" className="max-w-full max-h-full object-contain mix-blend-multiply z-20 relative" />
                                )}
                                {data.ttd.stempel && (
                                    <img
                                        src={data.ttd.stempel}
                                        alt="Stempel"
                                        className="absolute w-36 h-36 object-contain mix-blend-multiply opacity-70 rotate-[15deg] z-10 left-[60%] top-1/2 -translate-x-1/2 -translate-y-1/2"
                                    />
                                )}
                            </div>
                        </div>

                        <p className="text-sm font-bold underline uppercase tracking-wide">{data.ttd.namaPenandatangan || data.pihakPembuat.nama || '....................'}</p>
                        <p className="text-xs text-slate-500 font-medium">{data.pihakPembuat.jabatan || 'Jabatan'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Preview;
