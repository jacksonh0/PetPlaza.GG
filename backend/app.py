import gradio as gr
from transformers import AutoTokenizer, AutoModelForCausalLM

# Load LLaMA 3.2 model
model_name = "meta-llama/Llama-3.2-1B"  # Update this if using a specific variant
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

def chatbot(input_text):
    inputs = tokenizer(input_text, return_tensors="pt")
    outputs = model.generate(inputs["input_ids"], max_length=150, num_return_sequences=1)
    response = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return response

# Gradio interface
interface = gr.Interface(
    fn=chatbot,
    inputs="text",
    outputs="text",
    title="PetPlaza Chatbot",
    description="Ask me anything about PetPlaza!"
)

if __name__ == "__main__":
    interface.launch()
