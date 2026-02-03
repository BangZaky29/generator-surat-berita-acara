import { useState, useEffect } from 'react';
import Header from './components/Header';
import FormInput from './components/FormInput';
import Preview from './components/Preview';
import Toolbar from './components/Toolbar';
import HistoryDropdown from './components/HistoryDropdown';
import MobileActionButton from './components/MobileActionButton';
import Notification from './components/Notification';
import type { NotificationType } from './components/Notification';
import Modal from './components/Modal';
import type { SuratBeritaAcaraData, HistoryItem } from './types';
import { getHistory, saveToHistory, deleteFromHistory, clearHistory } from './utils/localStorage';
import { downloadPDF } from './utils/downloadPDF';
import { generateNomorSurat } from './utils/generateNomorSurat';

const initialData: SuratBeritaAcaraData = {
  kopSurat: {
    logo: '',
    namaPerusahaan: '',
    alamatPerusahaan: '',
    noTelp: '',
    email: '',
    website: ''
  },
  informasiSurat: {
    judul: 'BERITA ACARA',
    nomorSurat: generateNomorSurat(),
    tempat: 'Jakarta',
    tanggal: new Date().toISOString().split('T')[0]
  },
  pihakPembuat: { nama: '', jabatan: '', noHP: '', email: '' },
  pihakTujuan: { nama: '', jabatan: '', noHP: '', email: '' },
  isiBeritaAcara: ['', ''],
  paragrafPenutup: 'Demikian Berita Acara Nomor {NomorSurat} ini kami sampaikan guna melengkapi hasil pertemuan atau hasil diskusi baik secara offline maupun online. Agar tidak terjadi perbedaan prespektif terhadap kedua belah pihak. Atas perhatiannya kami ucapkan terima kasih.',
  ttd: {
    gambar: '',
    namaPenandatangan: '',
    stempel: ''
  }
};

function App() {
  const [data, setData] = useState<SuratBeritaAcaraData>(initialData);
  const [activeView, setActiveView] = useState<'form' | 'preview'>('form');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [saveLabel, setSaveLabel] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState<{
    show: boolean;
    type: 'import' | 'delete' | 'clear';
    targetId?: string;
    targetLabel?: string;
    targetItem?: HistoryItem;
  }>({ show: false, type: 'import' });
  const [notification, setNotification] = useState<{ message: string; type: NotificationType } | null>(null);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const showNotify = (message: string, type: NotificationType = 'success') => {
    setNotification({ message, type });
  };

  const handleSave = () => {
    if (!saveLabel.trim()) {
      showNotify('Silakan masukkan nama data', 'error');
      return;
    }

    const newItem: HistoryItem = {
      id: Date.now().toString(),
      label: saveLabel,
      timestamp: Date.now(),
      data: data
    };

    saveToHistory(newItem);
    setHistory(getHistory());
    setShowSaveModal(false);
    setSaveLabel('');
    showNotify('Data berhasil disimpan');
  };

  const handleSelectHistory = (item: HistoryItem) => {
    setShowConfirmModal({ show: true, type: 'import', targetItem: item });
  };

  const handleDeleteHistory = (id: string, label: string) => {
    setShowConfirmModal({ show: true, type: 'delete', targetId: id, targetLabel: label });
  };

  const confirmAction = () => {
    if (showConfirmModal.type === 'import' && showConfirmModal.targetItem) {
      setData(showConfirmModal.targetItem.data);
      showNotify('Data berhasil dimuat');
      if (window.innerWidth < 768) setActiveView('preview');
    } else if (showConfirmModal.type === 'delete' && showConfirmModal.targetId) {
      deleteFromHistory(showConfirmModal.targetId);
      setHistory(getHistory());
      showNotify('Data riwayat dihapus', 'info');
    } else if (showConfirmModal.type === 'clear') {
      clearHistory();
      setHistory([]);
      showNotify('Semua riwayat telah dihapus', 'info');
    }
    setShowConfirmModal({ show: false, type: 'import' });
  };

  const handleDownload = async () => {
    showNotify('Mempersiapkan PDF...', 'info');
    await downloadPDF('surat-preview', `Berita_Acara_${data.informasiSurat.nomorSurat.replace(/\//g, '_')}`);
    showNotify('PDF berhasil didownload');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-6 md:py-8 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Form Side */}
          <div className={`${activeView === 'form' ? 'block' : 'hidden'} lg:block lg:col-span-5`}>
            <HistoryDropdown
              history={history}
              onSelect={handleSelectHistory}
              onDelete={handleDeleteHistory}
              onClear={() => setShowConfirmModal({ show: true, type: 'clear' })}
            />
            <FormInput data={data} onChange={setData} />
          </div>

          {/* Preview Side */}
          <div className={`${activeView === 'preview' ? 'block' : 'hidden'} lg:block lg:col-span-7 sticky top-24`}>
            <Toolbar
              onDownload={handleDownload}
              onSave={() => setShowSaveModal(true)}
            />
            <div className="flex flex-col items-center overflow-hidden pb-12">
              <div className="origin-top scale-[0.45] sm:scale-[0.7] md:scale-90 lg:scale-100 transition-all duration-500 flex justify-center">
                <Preview data={data} />
              </div>
            </div>
          </div>

        </div>
      </main>

      <MobileActionButton
        view={activeView}
        onClick={() => setActiveView(activeView === 'form' ? 'preview' : 'form')}
      />

      {/* Modals */}
      <Modal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        title="Simpan Data"
        footer={(
          <>
            <button onClick={() => setShowSaveModal(false)} className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-700">Batal</button>
            <button onClick={handleSave} className="px-6 py-2 bg-primary-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-primary-200 hover:bg-primary-700">Simpan</button>
          </>
        )}
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-500 font-medium leading-relaxed">Berikan label untuk data ini agar mudah ditemukan di riwayat nanti.</p>
          <input
            autoFocus
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold outline-none focus:bg-white focus:border-primary-400 focus:ring-4 focus:ring-primary-400/10 transition-all"
            placeholder="Contoh: Berita Acara Rapat Internal"
            value={saveLabel}
            onChange={(e) => setSaveLabel(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          />
        </div>
      </Modal>

      <Modal
        isOpen={showConfirmModal.show}
        onClose={() => setShowConfirmModal({ ...showConfirmModal, show: false })}
        title="Konfirmasi"
        footer={(
          <>
            <button onClick={() => setShowConfirmModal({ ...showConfirmModal, show: false })} className="px-4 py-2 text-sm font-bold text-slate-500">Batal</button>
            <button
              onClick={confirmAction}
              className={`px-6 py-2 rounded-xl text-sm font-bold shadow-lg text-white transition-all ${showConfirmModal.type === 'import' ? 'bg-primary-600 shadow-primary-200 hover:bg-primary-700' : 'bg-red-500 shadow-red-200 hover:bg-red-600'}`}
            >
              {showConfirmModal.type === 'import' ? 'Ya, Impor' : 'Ya, Hapus'}
            </button>
          </>
        )}
      >
        <p className="text-sm text-slate-600 font-medium leading-relaxed">
          {showConfirmModal.type === 'clear' && 'Anda yakin ingin menghapus SEMUA riwayat data? Tindakan ini tidak dapat dibatalkan.'}
          {showConfirmModal.type === 'delete' && `Anda yakin ingin menghapus "${showConfirmModal.targetLabel}" dari riwayat?`}
          {showConfirmModal.type === 'import' && `Anda yakin ingin memuat data "${showConfirmModal.targetItem?.label}"? Data yang belum tersimpan akan hilang.`}
        </p>
      </Modal>

      {/* Notification */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}

export default App;
