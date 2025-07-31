import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #f8f9fa;
  }

  .App {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  main {
    flex: 1;
    padding: 20px 0;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .btn {
    display: inline-block;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    text-decoration: none;
    text-align: center;
    font-size: 16px;
    font-weight: 500;
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
    
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      
      &:hover {
        transform: none;
        box-shadow: none;
      }
    }
  }

  .btn-primary {
    background-color: #007bff;
    color: white;
    
    &:hover {
      background-color: #0056b3;
    }
  }

  .btn-secondary {
    background-color: #6c757d;
    color: white;
    
    &:hover {
      background-color: #545b62;
    }
  }

  .btn-success {
    background-color: #28a745;
    color: white;
    
    &:hover {
      background-color: #1e7e34;
    }
  }

  .btn-danger {
    background-color: #dc3545;
    color: white;
    
    &:hover {
      background-color: #c82333;
    }
  }

  .btn-outline {
    background-color: transparent;
    border: 2px solid #007bff;
    color: #007bff;
    
    &:hover {
      background-color: #007bff;
      color: white;
    }
  }

  .form-group {
    margin-bottom: 20px;
  }

  .form-label {
    display: block;
    margin-bottom: 5px;
    font-weight: 500;
    color: #555;
  }

  .form-control {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
    transition: border-color 0.3s ease;
    
    &:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 0 2px rgba(0,123,255,0.25);
    }
  }

  .card {
    background: white;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0,0,0,0.15);
    }
  }

  .grid {
    display: grid;
    gap: 20px;
    
    &.grid-2 {
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }
    
    &.grid-3 {
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    }
    
    &.grid-4 {
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    }
  }

  .text-center {
    text-align: center;
  }

  .text-left {
    text-align: left;
  }

  .text-right {
    text-align: right;
  }

  .mb-1 { margin-bottom: 10px; }
  .mb-2 { margin-bottom: 20px; }
  .mb-3 { margin-bottom: 30px; }
  .mt-1 { margin-top: 10px; }
  .mt-2 { margin-top: 20px; }
  .mt-3 { margin-top: 30px; }

  .d-flex {
    display: flex;
  }

  .justify-content-between {
    justify-content: space-between;
  }

  .align-items-center {
    align-items: center;
  }

  .flex-wrap {
    flex-wrap: wrap;
  }

  .price {
    font-size: 1.2em;
    font-weight: bold;
    color: #28a745;
  }

  @media (max-width: 768px) {
    .container {
      padding: 0 15px;
    }
    
    .grid {
      gap: 15px;
      
      &.grid-2, &.grid-3, &.grid-4 {
        grid-template-columns: 1fr;
      }
    }
    
    .btn {
      width: 100%;
      margin-bottom: 10px;
    }
  }
`;

export default GlobalStyle;