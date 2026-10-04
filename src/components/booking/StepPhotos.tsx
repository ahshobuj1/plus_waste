'use client';

import React, { useState } from 'react';
import QuestionCard from './QuestionCard';
import { UploadedFile } from '@/types';

interface StepPhotosProps {
  stepNum: number;
  isOpen: boolean;
  isDone: boolean;
  isBad?: boolean;
  files: UploadedFile[];
  noPhotos: boolean;
  onFilesChange: (files: UploadedFile[]) => void;
  onNoPhotosChange: (noPhotos: boolean) => void;
  onAdvance: () => void;
  onEdit: () => void;
}

export default function StepPhotos({
  stepNum,
  isOpen,
  isDone,
  isBad = false,
  files,
  noPhotos,
  onFilesChange,
  onNoPhotosChange,
  onAdvance,
  onEdit
}: StepPhotosProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleAddFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    const newFiles: UploadedFile[] = [...files];

    Array.from(fileList).forEach(f => {
      if (!/^(image|video)\//.test(f.type)) return;
      if (f.size > 25 * 1024 * 1024) return;
      if (newFiles.length >= 12) return;
      newFiles.push({
        name: f.name,
        type: f.type.startsWith('video') ? 'video' : 'image',
        url: URL.createObjectURL(f),
        file: f
      });
    });

    onFilesChange(newFiles);
    if (newFiles.length > 0) {
      onNoPhotosChange(false);
    }
  };

  const handleRemove = (index: number) => {
    URL.revokeObjectURL(files[index].url);
    const updated = files.filter((_, idx) => idx !== index);
    onFilesChange(updated);
  };

  const handleNoPhotosToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    onNoPhotosChange(checked);
    if (checked) {
      files.forEach(f => URL.revokeObjectURL(f.url));
      onFilesChange([]);
    }
  };

  const imgCount = files.filter(f => f.type === 'image').length;
  let countText = `${imgCount} of 3 photos added`;
  let countClass = 'count short';
  if (noPhotos) {
    countText = 'Proceeding without photos. The crew will price on arrival.';
    countClass = 'count';
  } else if (imgCount >= 3) {
    countText = `${imgCount} photos added${files.length > imgCount ? ', plus video' : ''}`;
    countClass = 'count done';
  }

  const summary = noPhotos
    ? 'No photos available'
    : `${imgCount} photo${imgCount === 1 ? '' : 's'}`;

  return (
    <QuestionCard
      id="photos"
      stepNum={stepNum}
      title="Can you show us the pile?"
      summary={summary}
      isOpen={isOpen}
      isDone={isDone}
      isBad={isBad}
      hint="Three clear photos from different angles, with the whole pile in frame. If the crew cannot park alongside it, add a short video walking from the waste to where the van can stop."
      onEdit={onEdit}
    >
      <label
        className={`drop ${isDragOver ? 'hot' : ''} ${noPhotos ? 'off' : ''}`}
        id="drop"
        htmlFor="files"
        onDragEnter={e => { e.preventDefault(); setIsDragOver(true); }}
        onDragOver={e => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={e => { e.preventDefault(); setIsDragOver(false); }}
        onDrop={e => {
          e.preventDefault();
          setIsDragOver(false);
          handleAddFiles(e.dataTransfer.files);
        }}
      >
        <div className="big">Add photos or a video</div>
        <div className="sm">Tap to choose, or drag them here</div>
        <input
          type="file"
          id="files"
          accept="image/*,video/*"
          multiple
          disabled={noPhotos}
          onChange={e => {
            handleAddFiles(e.target.files);
            e.target.value = '';
          }}
        />
      </label>

      {files.length > 0 && (
        <div className="shots" id="shots">
          {files.map((f, idx) => (
            <div key={idx} className="shot">
              {f.type === 'video' ? (
                <div className="vid">
                  Video<br />{f.name.slice(0, 12)}
                </div>
              ) : (
                <img src={f.url} alt={f.name} />
              )}
              <button
                type="button"
                aria-label={`Remove ${f.name}`}
                onClick={() => handleRemove(idx)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <div className={countClass} id="shotCount" role="status" aria-live="polite">
        {countText}
      </div>

      <div className="chips" style={{ marginTop: '12px' }}>
        <label className="chip">
          <input
            type="checkbox"
            id="noPhotos"
            checked={noPhotos}
            onChange={handleNoPhotosToggle}
          />
          I do not have any photos available
        </label>
      </div>

      <div className="q-next">
        <button
          className="btn btn-go"
          type="button"
          disabled={!noPhotos && imgCount < 3}
          onClick={onAdvance}
        >
          Continue
        </button>
      </div>
      <p className="q-err">Please add three photos, or tick that you have none available.</p>
    </QuestionCard>
  );
}
