// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn calculate_binary(left: f64, right: f64, operator: &str) -> Result<f64, String> {
    match operator {
        "+" => Ok(left + right),
        "-" => Ok(left - right),
        "*" => Ok(left * right),
        "/" => {
            if right == 0.0 {
                Err("Cannot divide by zero".to_string())
            } else {
                Ok(left / right)
            }
        }
        _ => Err(format!("Unsupported operator: {operator}")),
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet, calculate_binary])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
