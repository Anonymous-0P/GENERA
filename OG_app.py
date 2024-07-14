import streamlit as st
from diffusers import StableDiffusionPipeline
import torch
from PIL import Image
import gc

# Load the StableDiffusionPipeline model
@st.cache_resource
def load_pipeline():
    try:
        pipe = StableDiffusionPipeline.from_pretrained("redstonehero/cetusmix_v4", torch_dtype=torch.float16)
        pipe = pipe.to("cuda")
        pipe.safety_checker = None
        return pipe
    except Exception as e:
        st.error(f"Error loading model: {e}")
        return None

pipe = load_pipeline()

# Define the function that uses the StableDiffusionPipeline
def generate_image(prompt, h=800, w=640, steps=25, guidance=7.5):
    if pipe is None:
        st.error("Model not loaded properly.")
        return None
    try:
        neg = "easynegative, human, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worstquality..."
        image = pipe(prompt, height=h, width=w, num_inference_steps=steps, guidance_scale=guidance, negative_prompt=neg).images[0]
        return image
    except Exception as e:
        st.error(f"Error generating image: {e}")
        return None
    finally:
        torch.cuda.empty_cache()
        gc.collect()

# Streamlit interface
st.title("Stable Diffusion Image Generator")

prompt = st.text_input("Enter your prompt:")
h = st.slider("Height", 256, 1024, 800)
w = st.slider("Width", 256, 1024, 640)
steps = st.slider("Steps", 1, 100, 25)
guidance = st.slider("Guidance Scale", 0.1, 20.0, 7.5)

if st.button("Generate Image"):
    with st.spinner("Generating image..."):
        image = generate_image(prompt, h, w, steps, guidance)
        if image:
            st.image(image, caption="Generated Image", use_column_width=True)

# Run the Streamlit app
if __name__ == "__main__":
    st._is_running_with_streamlit = True
    st.sidebar.title("Stable Diffusion Image Generator")
