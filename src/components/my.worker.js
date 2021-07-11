onmessage = (event) => {
    console.log(event.data);
    let { origin, data, letter, keywords } = event.data || {}
    data = JSON.parse(data || '{}')

    let list = letter ? data[letter] : JSON.parse(origin || '[]')

    if (keywords){
        list = list.filter(item => item.name.includes(keywords))
        console.log(4);
    }
    
    console.log('++++++++++++++++++++++++++++++++++++++');
    console.log('RESULT: ', list);

    postMessage(list)
}