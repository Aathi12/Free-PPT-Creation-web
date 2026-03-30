import React, { useState } from 'react';
import Header from './components/Header';
import AdSlot from './components/AdSlot';
import TemplateGallery from './components/TemplateGallery';
import Editor from './components/Editor';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template);
    setCurrentView('editor');
  };

  if (currentView === 'editor') {
    return (
      <Editor
        onBack={() => setCurrentView('landing')}
        template={selectedTemplate}
      />
    );
  }

  return (
    <div className="app-container">
      <Header onCreateNew={() => { setSelectedTemplate(null); setCurrentView('editor'); }} />
      
      <main className="app-main">
        {/* Top Banner Ad slot for monetization */}
        <AdSlot width="100%" height="90px" slotId="top-banner" />
        
        <div className="hero-section">
          <h2>Create stunning presentations in minutes.</h2>
          <p>Choose a premium template, customize with our advanced editor, and impress your audience.</p>
        </div>

        <TemplateGallery onSelectTemplate={handleSelectTemplate} />

        {/* Mid-page Ad slot */}
        <AdSlot width="100%" height="90px" slotId="mid-content" />
      </main>
    </div>
  );
}

export default App;
