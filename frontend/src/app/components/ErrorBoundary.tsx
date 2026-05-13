import React, { ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log para debugging
    console.error('ErrorBoundary caught error:', error);
    console.error('Error info:', errorInfo);

    // Ignore NotFoundError en Android (removeChild issue)
    if (error.name === 'NotFoundError' && error.message.includes('removeChild')) {
      // Este es un error conocido de Radix UI en Android
      // Lo ignoramos y resetamos el estado después de un tiempo
      setTimeout(() => {
        this.setState({ hasError: false, error: null });
      }, 100);
      return;
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError && this.state.error?.name !== 'NotFoundError') {
      return (
        <div className="flex items-center justify-center min-h-screen bg-background">
          <div className="text-center p-6 max-w-md">
            <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
            <h1 className="text-xl font-bold mb-2">Algo salió mal</h1>
            <p className="text-muted-foreground mb-4">
              {this.state.error?.message || 'Error inesperado en la aplicación'}
            </p>
            <button
              onClick={this.handleReset}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              Recargar
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
