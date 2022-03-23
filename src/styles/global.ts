import { createGlobalStyle } from 'styled-components';

interface ThemeType {
  background: string;
}

export const GlobalStyle = createGlobalStyle<{ theme: ThemeType }>`
  :root {
    --background: #f0f2f5;
    --red: #e52e4d;
    --green: #33cc95;
    --blue: #5429cc;
    --blue-light: #6933ff;
    --text-title: #363f5f;
    --text-body: #969cb3;
    --shape: #ffffff;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    transition: color, background, background-color, 0.2s;
  }

  html {
    @media (max-width: 1080px) {
      font-size: 93.75%;
    }

    @media (max-width: 720px) {
      font-size: 87.5%;
    }
  }

  body {
    background: ${({ theme }) => theme.background};
    -webkit-font-smoothing: antialised;
  }

  body, input, textarea, button {
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
  }
  
  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 600;
  }

  button {
    cursor: pointer;
  }

  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  .react-modal-overlay {
    background: rgba(0,0,0,0.5);
    position: fixed;
    inset: 0;    
    display: flex;
    align-items: center;
    justify-content: center;
    animation: openOverlay forwards 0.1s;

    @keyframes openOverlay {
      from {
        background: rgba(0,0,0,0.2);
      }
    }
  }
  
  .react-modal-content {
    width: 100%;
    max-width: 576px;
    background: ${({ theme }) => theme.background};
    padding: 3rem;
    position: relative;
    border-radius: 0.25rem;
    animation: openModal forwards 0.1s;

    @keyframes openModal {
      from {
        transform: scale(0.92);
      }
    }
  }

  .react-modal-close {
    position: absolute;
    right: 1.5rem;
    top: 1.5rem;
    border: 0;
    background: transparent;
    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.8);
    }
  }
`;
