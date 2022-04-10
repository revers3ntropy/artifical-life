use warp::Filter;

#[tokio::main]
pub async fn start_server() {
    println!("Starting server...");

    let hello = warp::path!("")
        .map(|| format!("Hello!"));

    warp::serve(hello)
        .run(([127, 0, 0, 1], 3030))
        .await;
}