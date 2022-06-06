import React, { useRef, useEffect } from 'react'

function Canvas(props: any) {

    const canvasRef = useRef<HTMLCanvasElement>(null)

    const drawColorbox = (ctx:CanvasRenderingContext2D ) => {
        let width = ctx.canvas.width
        let height = ctx.canvas.height
        let imageData = ctx.getImageData(0, 0, width, height);
        let pixels = imageData.data
        let horizontalBlocks = Math.floor(width / 32)
        for (var off = 0; off < 32 * 32 * 32 * 4; off += 4) {
            let x = (off >> 2) % width
            let y = Math.floor((off >> 2) / width)
            // red transitions from 0 to 255 and back horizontally across successive blocks
            let r = (!(x & 32) ? x % 32 : 31 - (x % 32)) * 8
            // green transitions from 0 to 255 and back vertically across successive blocks
            let g = (!(y & 32) ? y % 32 : 31 - (y % 32)) * 8
            // blue "winds" back and forth from block to block horizontally then vertically (e.g. 0...56, 120...64, 128...184, 248...192)

            let by = (y >> 5), bx = (x >> 5)
            let b = !(y & 32) ? (bx * 8 + by * 8 * horizontalBlocks) : ((by + 1) * 8 * horizontalBlocks - (bx + 1) * 8)

            pixels[off] = r
            pixels[off + 1] = g
            pixels[off + 2] = b
            pixels[off + 3] = 255
        }  
        ctx.putImageData(imageData, 0, 0)
    }

    useEffect(() => {
        
        const canvas = canvasRef.current
        const context = canvas?.getContext('2d')
        if (context) {
            drawColorbox(context)
        }
    }, [])

    return <canvas ref={canvasRef} {...props} />
}

Canvas.defaultProps = {
    width: 256,
    height: 128 
};

export default Canvas