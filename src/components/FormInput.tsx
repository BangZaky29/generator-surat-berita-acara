import React, { useState } from 'react';
import {
    Building2,
    MapPin,
    Phone,
    Mail,
    Globe,
    FileSignature,
    User,
    Briefcase,
    Plus,
    Trash2,
    MessageSquare,
    ChevronDown,
    Layout
} from 'lucide-react';
import type { SuratBeritaAcaraData } from '../types';
import TTDUpload from './TTDUpload';
import StampUpload from './StampUpload';

interface FormInputProps {
    data: SuratBeritaAcaraData;
    onChange: (data: SuratBeritaAcaraData) => void;
}

const FormInput: React.FC<FormInputProps> = ({ data, onChange }) => {
    const [activeSection, setActiveSection] = useState<string | null>('kop');

    const updateField = (section: keyof SuratBeritaAcaraData, field: string, value: any) => {
        const newData = { ...data };
        if (typeof newData[section] === 'object' && !Array.isArray(newData[section])) {
            (newData[section] as any)[field] = value;
        } else {
            (newData as any)[section] = value;
        }
        onChange(newData);
    };

    const handleKopChange = (field: string, value: string) => {
        onChange({
            ...data,
            kopSurat: { ...data.kopSurat, [field]: value }
        });
    };

    const handleInfoChange = (field: string, value: string) => {
        onChange({
            ...data,
            informasiSurat: { ...data.informasiSurat, [field]: value }
        });
    };

    const handlePihakChange = (section: 'pihakPembuat' | 'pihakTujuan', field: string, value: string) => {
        onChange({
            ...data,
            [section]: { ...data[section], [field]: value }
        });
    };

    const addIsiPoint = () => {
        onChange({
            ...data,
            isiBeritaAcara: [...data.isiBeritaAcara, '']
        });
    };

    const updateIsiPoint = (index: number, value: string) => {
        const newIsi = [...data.isiBeritaAcara];
        newIsi[index] = value;
        onChange({ ...data, isiBeritaAcara: newIsi });
    };

    const removeIsiPoint = (index: number) => {
        const newIsi = data.isiBeritaAcara.filter((_, i) => i !== index);
        onChange({ ...data, isiBeritaAcara: newIsi });
    };

    const Section = ({ id, title, icon: Icon, children }: { id: string, title: string, icon: any, children: React.ReactNode }) => {
        const isOpen = activeSection === id;

        return (
            <div className={`bg-white rounded-3xl border transition-all duration-300 overflow-hidden ${isOpen ? 'border-primary-200 shadow-lg ring-1 ring-primary-50' : 'border-slate-200 shadow-soft hover:border-primary-100'}`}>
                <button
                    onClick={() => setActiveSection(isOpen ? null : id)}
                    className={`w-full px-6 py-5 flex items-center justify-between transition-colors ${isOpen ? 'bg-primary-50/50' : 'bg-slate-50 hover:bg-white'}`}
                >
                    <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl shadow-sm flex items-center justify-center transition-all ${isOpen ? 'bg-primary-600 text-white shadow-primary-200 scale-110' : 'bg-white text-primary-600'}`}>
                            <Icon className="w-5 h-5" />
                        </div>
                        <h3 className={`text-sm font-bold uppercase tracking-wider transition-colors ${isOpen ? 'text-primary-900' : 'text-slate-800'}`}>{title}</h3>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-500 ${isOpen ? 'rotate-180 text-primary-500' : ''}`} />
                </button>

                <div className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[2000px] opacity-100 py-6' : 'max-h-0 opacity-0 overflow-hidden py-0'}`}>
                    <div className="px-6 space-y-6">
                        {children}
                    </div>
                </div>
            </div>
        );
    };

    const InputField = ({ label, icon: Icon, ...props }: any) => (
        <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{label}</label>
            <div className="relative group/input">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-primary-500 transition-colors">
                    <Icon className="w-4 h-4" />
                </div>
                <input
                    {...props}
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium text-slate-700 outline-none focus:bg-white focus:border-primary-400 focus:ring-4 focus:ring-primary-400/10 transition-all placeholder:text-slate-300"
                />
            </div>
        </div>
    );

    return (
        <div className="space-y-4 pb-20">
            <Section id="kop" title="Kop Surat Perusahaan" icon={Building2}>
                <div className="mb-4">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Logo Perusahaan</label>
                    <div className="flex items-center gap-4">
                        {data.kopSurat.logo && (
                            <img src={data.kopSurat.logo} alt="Logo" className="w-16 h-16 object-contain rounded-xl border p-2 bg-white" />
                        )}
                        <label className="flex-1 cursor-pointer">
                            <div className="border-2 border-dashed border-slate-200 rounded-2xl py-4 flex flex-col items-center hover:bg-slate-50 hover:border-primary-300 transition-all">
                                <Plus className="w-5 h-5 text-slate-400 mb-1" />
                                <span className="text-xs font-bold text-slate-500">{data.kopSurat.logo ? 'Ganti Logo' : 'Upload Logo'}</span>
                            </div>
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => handleKopChange('logo', reader.result as string);
                                        reader.readAsDataURL(file);
                                    }
                                }}
                            />
                        </label>
                    </div>
                </div>
                <InputField
                    label="Nama Perusahaan"
                    icon={Building2}
                    placeholder="PT. Example Jaya"
                    value={data.kopSurat.namaPerusahaan}
                    onChange={(e: any) => handleKopChange('namaPerusahaan', e.target.value)}
                />
                <InputField
                    label="Alamat Perusahaan"
                    icon={MapPin}
                    placeholder="Jl. Teknologi No. 123"
                    value={data.kopSurat.alamatPerusahaan}
                    onChange={(e: any) => handleKopChange('alamatPerusahaan', e.target.value)}
                />
                <div className="grid grid-cols-2 gap-4">
                    <InputField
                        label="No Telp / HP"
                        icon={Phone}
                        placeholder="0812..."
                        value={data.kopSurat.noTelp}
                        onChange={(e: any) => handleKopChange('noTelp', e.target.value)}
                    />
                    <InputField
                        label="Email"
                        icon={Mail}
                        placeholder="info@company.com"
                        value={data.kopSurat.email}
                        onChange={(e: any) => handleKopChange('email', e.target.value)}
                    />
                </div>
                <InputField
                    label="Website"
                    icon={Globe}
                    placeholder="www.company.com"
                    value={data.kopSurat.website}
                    onChange={(e: any) => handleKopChange('website', e.target.value)}
                />
            </Section>

            <Section id="info" title="Informasi Surat" icon={FileSignature}>
                <InputField
                    label="Judul Surat"
                    icon={Layout}
                    value={data.informasiSurat.judul}
                    onChange={(e: any) => handleInfoChange('judul', e.target.value)}
                />
                <InputField
                    label="Nomor Surat"
                    icon={FileSignature}
                    placeholder="BA/2026/001"
                    value={data.informasiSurat.nomorSurat}
                    onChange={(e: any) => handleInfoChange('nomorSurat', e.target.value)}
                />
                <div className="grid grid-cols-2 gap-4">
                    <InputField
                        label="Tempat"
                        icon={MapPin}
                        placeholder="Jakarta"
                        value={data.informasiSurat.tempat}
                        onChange={(e: any) => handleInfoChange('tempat', e.target.value)}
                    />
                    <InputField
                        label="Tanggal"
                        icon={MessageSquare}
                        type="date"
                        value={data.informasiSurat.tanggal}
                        onChange={(e: any) => handleInfoChange('tanggal', e.target.value)}
                    />
                </div>
            </Section>

            <Section id="pihak1" title="Pihak Pertama (Pembuat)" icon={User}>
                <InputField
                    label="Nama Lengkap"
                    icon={User}
                    placeholder="Nama Pihak Pertama"
                    value={data.pihakPembuat.nama}
                    onChange={(e: any) => handlePihakChange('pihakPembuat', 'nama', e.target.value)}
                />
                <InputField
                    label="Pekerjaan / Jabatan"
                    icon={Briefcase}
                    placeholder="Manager"
                    value={data.pihakPembuat.jabatan}
                    onChange={(e: any) => handlePihakChange('pihakPembuat', 'jabatan', e.target.value)}
                />
                <div className="grid grid-cols-2 gap-4">
                    <InputField
                        label="No HP"
                        icon={Phone}
                        value={data.pihakPembuat.noHP}
                        onChange={(e: any) => handlePihakChange('pihakPembuat', 'noHP', e.target.value)}
                    />
                    <InputField
                        label="Email"
                        icon={Mail}
                        value={data.pihakPembuat.email}
                        onChange={(e: any) => handlePihakChange('pihakPembuat', 'email', e.target.value)}
                    />
                </div>
            </Section>

            <Section id="pihak2" title="Pihak Kedua (Tujuan)" icon={User}>
                <InputField
                    label="Nama / Perusahaan"
                    icon={User}
                    placeholder="Nama Pihak Kedua"
                    value={data.pihakTujuan.nama}
                    onChange={(e: any) => handlePihakChange('pihakTujuan', 'nama', e.target.value)}
                />
                <InputField
                    label="Pekerjaan / Jabatan"
                    icon={Briefcase}
                    placeholder="Manager"
                    value={data.pihakTujuan.jabatan}
                    onChange={(e: any) => handlePihakChange('pihakTujuan', 'jabatan', e.target.value)}
                />
                <div className="grid grid-cols-2 gap-4">
                    <InputField
                        label="No HP"
                        icon={Phone}
                        value={data.pihakTujuan.noHP}
                        onChange={(e: any) => handlePihakChange('pihakTujuan', 'noHP', e.target.value)}
                    />
                    <InputField
                        label="Email"
                        icon={Mail}
                        value={data.pihakTujuan.email}
                        onChange={(e: any) => handlePihakChange('pihakTujuan', 'email', e.target.value)}
                    />
                </div>
            </Section>

            <Section id="isi" title="Isi Berita Acara" icon={MessageSquare}>
                <div className="space-y-4">
                    {data.isiBeritaAcara.map((point, index) => (
                        <div key={index} className="flex gap-3 items-start group">
                            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 shrink-0 mt-2">
                                {index + 1}
                            </div>
                            <textarea
                                className="flex-1 p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium text-slate-700 outline-none focus:bg-white focus:border-primary-400 focus:ring-4 focus:ring-primary-400/10 transition-all min-h-[80px]"
                                value={point}
                                placeholder={`Masukkan poin ke-${index + 1}...`}
                                onChange={(e) => updateIsiPoint(index, e.target.value)}
                            />
                            <button
                                onClick={() => removeIsiPoint(index)}
                                className="p-2 text-slate-300 hover:text-red-500 mt-2 transition-colors opacity-0 group-hover:opacity-100"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                    <button
                        onClick={addIsiPoint}
                        className="w-full py-3 flex items-center justify-center gap-2 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 hover:text-primary-600 hover:border-primary-300 hover:bg-primary-50 transition-all font-bold text-xs uppercase tracking-widest"
                    >
                        <Plus className="w-4 h-4" /> Tambah Poin Isi
                    </button>
                </div>
            </Section>

            <Section id="penutup" title="Paragraf Penutup" icon={MessageSquare}>
                <div className="space-y-2">
                    <p className="text-[10px] text-slate-400 font-medium italic">Paragraf ini akan muncul otomatis sebelum tanda tangan.</p>
                    <textarea
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium text-slate-700 outline-none focus:bg-white focus:border-primary-400 transition-all min-h-[120px]"
                        value={data.paragrafPenutup}
                        onChange={(e) => updateField('paragrafPenutup', '', e.target.value)}
                    />
                </div>
            </Section>

            <Section id="ttd" title="Tanda Tangan & Stempel" icon={FileSignature}>
                <div className="space-y-6">
                    <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Upload / Gambar TTD</label>
                        <TTDUpload
                            onUpload={(url) => onChange({ ...data, ttd: { ...data.ttd, gambar: url } })}
                            currentImage={data.ttd.gambar}
                        />
                    </div>
                    <div>
                        <InputField
                            label="Nama Penandatangan"
                            icon={User}
                            placeholder="Jhon Doe"
                            value={data.ttd.namaPenandatangan}
                            onChange={(e: any) => onChange({ ...data, ttd: { ...data.ttd, namaPenandatangan: e.target.value } })}
                        />
                    </div>
                    <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Stempel Perusahaan</label>
                        <StampUpload
                            onUpload={(url) => onChange({ ...data, ttd: { ...data.ttd, stempel: url } })}
                            currentImage={data.ttd.stempel}
                        />
                    </div>
                </div>
            </Section>
        </div>
    );
};

export default FormInput;

