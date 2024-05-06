from flask import Flask, request, jsonify
from flask_cors import CORS
from minimax import Minimax
app = Flask(__name__)
CORS(app)
@app.route('/minimax', methods=['POST'])
def minimax():
    data = request.get_json()
    board = data['board']
    print(data)
    player = data['player']

    # Crie uma instância do seu agente Minimax aqui
    agent = Minimax(player)

    # Chame a função minimax do seu agente para obter a melhor ação
    best_action = agent.minimax(board, player)

    # Retorne a melhor ação como uma resposta JSON
    return jsonify({'best_action': best_action})

if __name__ == '__main__':
    app.run(port=5000)