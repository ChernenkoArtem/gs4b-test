import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import { Dialog, DialogContent } from '@mui/material';

interface ModalContextType {
  openModal: <T>(Component: React.ComponentType<T>, props: T) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalContent, setModalContent] = useState<{
    Component: React.ComponentType<any>;
    props: Record<string, any>;
  } | null>(null);

  const openModal = useCallback(
    <T,>(Component: React.ComponentType<T>, props: T) => {
      setModalContent({ Component, props: props as Record<string, any> });
    },
    [],
  );

  const closeModal = useCallback(() => {
    setModalContent(null);
  }, []);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}

      <Dialog
        open={Boolean(modalContent)}
        onClose={closeModal}
        fullWidth
        maxWidth="sm"
        sx={{ '& .MuiDialog-paper': { borderRadius: 2 } }}
      >
        {modalContent && (
          <DialogContent>
            <modalContent.Component
              {...modalContent.props}
              onCancel={closeModal} // Автоматично прокидаємо закриття
            />
          </DialogContent>
        )}
      </Dialog>
    </ModalContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useModal must be used within ModalProvider');
  return context;
};
