from copy import deepcopy
class Minimax:
    def __init__(self, max):
        self.max = max
        self.min = 'O' if max == 'X' else 'X'
        
    def minimax(self, board, player):
        alpha = float('-inf')
        beta = float('inf')
        _, best_action = self.player_max(board, alpha, beta)
        return best_action

    def player_max(self, board, alpha, beta):
        if self.terminal_test(board):
            return self.utility(board), None
        v = float('-inf')
        best_action = None
        for state, coords in self.generate_states(board, self.max):
            new_v, _ = self.player_min(state, alpha, beta)
            if new_v > v:
                v = new_v
                best_action = coords
            if beta <= alpha:
                break
            alpha = max(alpha, v)
        return v, best_action

    def player_min(self, board, alpha, beta):
        if self.terminal_test(board):
            return self.utility(board), None
        v = float('inf')
        best_action = None
        for state, coords in self.generate_states(board, self.min):
            new_v, _ = self.player_max(state, alpha, beta)
            if new_v < v:
                v = new_v
                best_action = coords
            if beta <= alpha:
                break
            beta = min(beta, v)
        return v, best_action
    
    def terminal_test(self, board):
        if board[0][0] == board[0][1] == board[0][2] != '':
            return board[0][0]
        elif board[1][0] == board[1][1] == board[1][2] != '':
            return board[1][0]
        elif board[2][0] == board[2][1] == board[2][2] != '':
            return board[2][0]
        elif board[0][0] == board[1][0] == board[2][0] != '':
            return board[0][0]
        elif board[0][1] == board[1][1] == board[2][1] != '':
            return board[0][1]
        elif board[0][2] == board[1][2] == board[2][2] != '':
            return board[0][2]
        elif board[0][0] == board[1][1] == board[2][2] != '':
            return board[0][0]
        elif board[0][2] == board[1][1] == board[2][0] != '':
            return board[0][2]
        if not any('' in sublist for sublist in board):
            return "empate"
        return 0
    
    def utility(self, board):
        if self.terminal_test(board) == self.max:
            return 1
        elif self.terminal_test(board) == self.min:
            return -1
        elif "empate":
            return 0
        return None
    
    def generate_states(self, board, player):
        states = []
        for i in range(3):
            for j in range(3):
                if board[i][j] == '':
                    new_board = deepcopy(board)
                    new_board[i][j] = player
                    states.append(new_board)
                    yield new_board, (i, j)
