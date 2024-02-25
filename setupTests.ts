import '@testing-library/jest-dom/extend-expect';

declare global {
    namespace jest {
        interface Matchers<R> {
            toHaveValue(value: string | number): R;
            toHaveTextContent(htmlElement: string): R;
            toBeInTheDocument(): R;
        }
    }
}
