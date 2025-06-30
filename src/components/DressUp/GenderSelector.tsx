
interface GenderSelectorProps {
  selectedGender: 'barbie' | 'ken';
  onGenderChange: (gender: 'barbie' | 'ken') => void;
}

const GenderSelector = ({ selectedGender, onGenderChange }: GenderSelectorProps) => {
  return (
    <div className="flex items-center gap-4 mb-6">
      <span className="text-gray-700 font-medium">Choose Avatar:</span>
      <div className="flex bg-white rounded-xl p-1 shadow-lg">
        <button
          onClick={() => onGenderChange('barbie')}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${
            selectedGender === 'barbie' 
              ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg transform scale-105' 
              : 'text-gray-600 hover:bg-pink-50'
          }`}
        >
          <span className="text-2xl">👸</span>
          <span className="font-medium">Barbie</span>
        </button>
        <button
          onClick={() => onGenderChange('ken')}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${
            selectedGender === 'ken' 
              ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg transform scale-105' 
              : 'text-gray-600 hover:bg-blue-50'
          }`}
        >
          <span className="text-2xl">🤴</span>
          <span className="font-medium">Ken</span>
        </button>
      </div>
    </div>
  );
};

export default GenderSelector;
