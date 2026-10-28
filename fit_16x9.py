import sys
from PIL import Image

def fit_to_16_9(input_path, output_path):
    # Open the original tight diagram
    img = Image.open(input_path)
    
    # Get original dimensions
    img_w, img_h = img.size
    
    # We want a 16:9 aspect ratio.
    # Determine the target dimensions that fully encapsulate the image + padding
    padding = 200
    padded_w = img_w + padding
    padded_h = img_h + padding
    
    # Calculate 16:9 dimensions based on whichever dimension is the limiting factor
    # 16:9 means width / height = 16 / 9 = 1.777...
    target_aspect = 16.0 / 9.0
    current_aspect = padded_w / padded_h
    
    if current_aspect > target_aspect:
        # Image is wider than 16:9, so width dictates the 16:9 height
        target_w = padded_w
        target_h = int(target_w / target_aspect)
    else:
        # Image is taller than 16:9, so height dictates the 16:9 width
        target_h = padded_h
        target_w = int(target_h * target_aspect)
        
    # Create a new blank white 16:9 canvas
    canvas = Image.new('RGB', (target_w, target_h), (255, 255, 255))
    
    # Calculate offset to paste the image perfectly in the center
    offset_x = (target_w - img_w) // 2
    offset_y = (target_h - img_h) // 2
    
    # Paste using the image itself as a mask if it has transparency, else just paste
    if img.mode == 'RGBA':
        canvas.paste(img, (offset_x, offset_y), img)
    else:
        canvas.paste(img, (offset_x, offset_y))
        
    # Save the beautifully centered 16:9 image
    canvas.save(output_path, quality=100)
    print(f"Successfully saved 16:9 image to {output_path}")

if __name__ == "__main__":
    input_file = r"C:\Users\vinaa\.gemini\antigravity\brain\616d68e2-6074-4071-b410-84b68dfb73dd\er_diagram_tight.png"
    output_file = r"C:\Users\vinaa\.gemini\antigravity\brain\616d68e2-6074-4071-b410-84b68dfb73dd\er_diagram_16x9.png"
    fit_to_16_9(input_file, output_file)
