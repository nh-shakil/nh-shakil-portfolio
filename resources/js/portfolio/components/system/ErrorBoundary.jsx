import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error?.message || 'Unknown error' };
  }

  componentDidCatch(error) {
    // Keep minimal: user can open console for stack trace.
    console.error('Portfolio runtime error:', error);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="container-shell py-16">
        <div className="rounded-[26px] border border-rose-300/20 bg-rose-300/10 px-6 py-10 text-rose-50">
          <div className="text-lg font-semibold">Something went wrong</div>
          <div className="mt-2 text-sm opacity-90">
            {this.state.message}
          </div>
          <div className="mt-6">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black hover:bg-white/90"
            >
              Reload page
            </button>
          </div>
        </div>
      </div>
    );
  }
}

