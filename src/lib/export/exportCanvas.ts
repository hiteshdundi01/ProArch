import { toPng, toSvg } from 'html-to-image';
import { ExportOptions } from '@/types/diagram';

/**
 * Export React Flow canvas element to PNG
 */
export async function exportToPng(
    element: HTMLElement,
    filename: string = 'diagram',
    options?: Partial<ExportOptions>
): Promise<void> {
    const scale = options?.scale || 2;
    const backgroundColor = options?.backgroundColor || '#ffffff';

    try {
        const dataUrl = await toPng(element, {
            pixelRatio: scale,
            backgroundColor,
            filter: (node) => {
                // Exclude controls and minimap from export
                if (node.classList) {
                    return !(
                        node.classList.contains('react-flow__controls') ||
                        node.classList.contains('react-flow__minimap') ||
                        node.classList.contains('react-flow__attribution')
                    );
                }
                return true;
            },
        });

        downloadDataUrl(dataUrl, `${filename}.png`);
    } catch (error) {
        console.error('Failed to export PNG:', error);
        throw new Error('Failed to export diagram as PNG');
    }
}

/**
 * Export React Flow canvas element to SVG
 */
export async function exportToSvg(
    element: HTMLElement,
    filename: string = 'diagram',
    options?: Partial<ExportOptions>
): Promise<void> {
    const backgroundColor = options?.backgroundColor || '#ffffff';

    try {
        const dataUrl = await toSvg(element, {
            backgroundColor,
            filter: (node) => {
                // Exclude controls and minimap from export
                if (node.classList) {
                    return !(
                        node.classList.contains('react-flow__controls') ||
                        node.classList.contains('react-flow__minimap') ||
                        node.classList.contains('react-flow__attribution')
                    );
                }
                return true;
            },
        });

        downloadDataUrl(dataUrl, `${filename}.svg`);
    } catch (error) {
        console.error('Failed to export SVG:', error);
        throw new Error('Failed to export diagram as SVG');
    }
}

/**
 * Helper to trigger download from data URL
 */
function downloadDataUrl(dataUrl: string, filename: string): void {
    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    link.click();
}

/**
 * Copy diagram to clipboard as PNG
 */
export async function copyToClipboard(element: HTMLElement): Promise<void> {
    try {
        const dataUrl = await toPng(element, {
            pixelRatio: 2,
            backgroundColor: '#ffffff',
            filter: (node) => {
                if (node.classList) {
                    return !(
                        node.classList.contains('react-flow__controls') ||
                        node.classList.contains('react-flow__minimap') ||
                        node.classList.contains('react-flow__attribution')
                    );
                }
                return true;
            },
        });

        // Convert data URL to blob
        const response = await fetch(dataUrl);
        const blob = await response.blob();

        // Copy to clipboard
        await navigator.clipboard.write([
            new ClipboardItem({
                'image/png': blob,
            }),
        ]);
    } catch (error) {
        console.error('Failed to copy to clipboard:', error);
        throw new Error('Failed to copy diagram to clipboard');
    }
}
