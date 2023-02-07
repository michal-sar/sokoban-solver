:- dynamic board/1, initial_position/2, final_position/2.

% board(Board) :- Board = [
%   ['.','.','.','.','#','#','#','#','#','.','.','.','.','.','.','.','.','.','.'],
%   ['.','.','.','.','#','.','.','.','#','.','.','.','.','.','.','.','.','.','.'],
%   ['.','.','.','.','#','0','.','.','#','.','.','.','.','.','.','.','.','.','.'],
%   ['.','.','#','#','#','.','.','0','#','#','.','.','.','.','.','.','.','.','.'],
%   ['.','.','#','.','.','0','.','0','.','#','.','.','.','.','.','.','.','.','.'],
%   ['#','#','#','.','#','.','#','#','.','#','.','.','.','#','#','#','#','#','#'],
%   ['#','.','.','.','#','.','#','#','.','#','#','#','#','#','.','.','.','.','#'],
%   ['#','.','0','.','.','0','.','.','.','.','.','.','.','.','.','.','.','.','#'],
%   ['#','#','#','#','#','.','#','#','#','.','#','o','#','#','.','.','.','.','#'],
%   ['.','.','.','.','#','.','.','.','.','.','#','#','#','#','#','#','#','#','#'],
%   ['.','.','.','.','#','#','#','#','#','#','#','.','.','.','.','.','.','.','.']].

% initial_position(12, 9).

% final_position(17, 7).
% final_position(18, 7).
% final_position(17, 8).
% final_position(18, 8).
% final_position(17, 9).
% final_position(18, 9).

% common {

check_element(Board, X, Y) :- nth1(Y, Board, Row), nth1(X, Row, Element), Element == '0'.

get_element(Board, X, Y, Element) :-
( X < 0, Element = '#', !
  ;
  Y < 0, Element = '#', !
  ;
  X > 19, Element = '#', !
  ;
  Y > 11, Element = '#', !
  ;
  nth1(Y, Board, Row), nth1(X, Row, Element), !
).

assert_positions_row([], [], _, _).
assert_positions_row(['o'|Tail], ['o'|Tail2], X, Y) :- asserta(initial_position(X, Y)), Xn is X + 1, assert_positions_row(Tail, Tail2, Xn, Y).
assert_positions_row(['x'|Tail], ['.'|Tail2], X, Y) :- asserta(final_position(X, Y)), Xn is X + 1, assert_positions_row(Tail, Tail2, Xn, Y).
assert_positions_row(['1'|Tail], ['0'|Tail2], X, Y) :- asserta(final_position(X, Y)), Xn is X + 1, assert_positions_row(Tail, Tail2, Xn, Y).
assert_positions_row([Head|Tail], [Head|Tail2], X, Y) :- Head \= 'o', Head \= 'x', Xn is X + 1, assert_positions_row(Tail, Tail2, Xn, Y).

assert_positions([], [], _).
assert_positions([Head|Tail], [Head2|Tail2], Y) :- assert_positions_row(Head, Head2, 1, Y), Yn is Y + 1, assert_positions(Tail, Tail2, Yn).

move_row([], [], _, _, _, _, _, _).
move_row([_|Tail], ['.'|Tail2], X, Y, P_X, P_Y, E_X, E_Y) :- X == E_X, Y == E_Y, Xn is X + 1, move_row(Tail, Tail2, Xn, Y, P_X, P_Y, E_X, E_Y).
move_row([_|Tail], ['o'|Tail2], X, Y, P_X, P_Y, E_X, E_Y) :- X == P_X, Y == P_Y, Xn is X + 1, move_row(Tail, Tail2, Xn, Y, P_X, P_Y, E_X, E_Y).
move_row([Head|Tail], [Head|Tail2], X, Y, P_X, P_Y, E_X, E_Y) :- X \= P_X, X \= E_X, Xn is X + 1, move_row(Tail, Tail2, Xn, Y, P_X, P_Y, E_X, E_Y).

move([], [], _, _, _, _, _).
move([Head|Tail], [Head2|Tail2], Y, P_X, Y, E_X, Y) :- move_row(Head, Head2, 1, Y, P_X, Y, E_X, Y), Yn is Y + 1, move(Tail, Tail2, Yn, P_X, Y, E_X, Y).
move([Head|Tail], [Head2|Tail2], Y, P_X, P_Y, E_X, Y) :- Y \= P_Y, move_row(Head, Head2, 1, Y, P_X, P_Y, E_X, Y), Yn is Y + 1, move(Tail, Tail2, Yn, P_X, P_Y, E_X, Y).
move([Head|Tail], [Head2|Tail2], Y, P_X, Y, E_X, E_Y) :- Y \= E_Y, move_row(Head, Head2, 1, Y, P_X, Y, E_X, E_Y), Yn is Y + 1, move(Tail, Tail2, Yn, P_X, Y, E_X, E_Y).
move([Head|Tail], [Head|Tail2], Y, P_X, P_Y, E_X, E_Y) :- Y \= P_Y, Y \= E_Y, Yn is Y + 1, move(Tail, Tail2, Yn, P_X, P_Y, E_X, E_Y).

move_row_box([], [], _, _, _, _, _, _, _, _).
move_row_box([_|Tail], ['.'|Tail2], X, Y, P_X, P_Y, E_X, E_Y, B_X, B_Y) :- X == E_X, Y == E_Y, Xn is X + 1, move_row_box(Tail, Tail2, Xn, Y, P_X, P_Y, E_X, E_Y, B_X, B_Y).
move_row_box([_|Tail], ['o'|Tail2], X, Y, P_X, P_Y, E_X, E_Y, B_X, B_Y) :- X == P_X, Y == P_Y, Xn is X + 1, move_row_box(Tail, Tail2, Xn, Y, P_X, P_Y, E_X, E_Y, B_X, B_Y).
move_row_box([_|Tail], ['0'|Tail2], X, Y, P_X, P_Y, E_X, E_Y, B_X, B_Y) :- X == B_X, Y == B_Y, Xn is X + 1, move_row_box(Tail, Tail2, Xn, Y, P_X, P_Y, E_X, E_Y, B_X, B_Y).
move_row_box([Head|Tail], [Head|Tail2], X, Y, P_X, P_Y, E_X, E_Y, B_X, B_Y) :- X \= P_X, X \= E_X, X \= B_X, Xn is X + 1, move_row_box(Tail, Tail2, Xn, Y, P_X, P_Y, E_X, E_Y, B_X, B_Y).

move_box([], [], _, _, _, _, _, _, _).
move_box([Head|Tail], [Head2|Tail2], Y, P_X, Y, E_X, Y, B_X, Y) :- move_row_box(Head, Head2, 1, Y, P_X, Y, E_X, Y, B_X, Y), Yn is Y + 1, move_box(Tail, Tail2, Yn, P_X, Y, E_X, Y, B_X, Y).
move_box([Head|Tail], [Head2|Tail2], Y, P_X, Y, E_X, E_Y, B_X, B_Y) :- Y \= E_Y, Y \= B_Y, move_row_box(Head, Head2, 1, Y, P_X, Y, E_X, E_Y, B_X, B_Y), Yn is Y + 1, move_box(Tail, Tail2, Yn, P_X, Y, E_X, E_Y, B_X, B_Y).
move_box([Head|Tail], [Head2|Tail2], Y, P_X, P_Y, E_X, Y, B_X, B_Y) :- Y \= P_Y, Y \= B_Y, move_row_box(Head, Head2, 1, Y, P_X, P_Y, E_X, Y, B_X, B_Y), Yn is Y + 1, move_box(Tail, Tail2, Yn, P_X, P_Y, E_X, Y, B_X, B_Y).
move_box([Head|Tail], [Head2|Tail2], Y, P_X, P_Y, E_X, E_Y, B_X, Y) :- Y \= P_Y, Y \= E_Y, move_row_box(Head, Head2, 1, Y, P_X, P_Y, E_X, E_Y, B_X, Y), Yn is Y + 1, move_box(Tail, Tail2, Yn, P_X, P_Y, E_X, E_Y, B_X, Y).
move_box([Head|Tail], [Head|Tail2], Y, P_X, P_Y, E_X, E_Y, B_X, B_Y) :- Y \= P_Y, Y \= E_Y, Y \= B_Y, Yn is Y + 1, move_box(Tail, Tail2, Yn, P_X, P_Y, E_X, E_Y, B_X, B_Y).

move_n(Board, NewBoard, X, Y) :- New is Y - 1, get_element(Board, X, New, Element),
  ( Element == '.', move(Board, NewBoard, 1, X, New, X, Y)
    ;
    Element == '0', Yn is Y - 2, get_element(Board, X, Yn, Element2), Element2 == '.', move_box(Board, NewBoard, 1, X, New, X, Y, X, Yn)
  ).

move_s(Board, NewBoard, X, Y) :- New is Y + 1, get_element(Board, X, New, Element),
  ( Element == '.', move(Board, NewBoard, 1, X, New, X, Y)
    ;
    Element == '0', Yn is Y + 2, get_element(Board, X, Yn, Element2), Element2 == '.', move_box(Board, NewBoard, 1, X, New, X, Y, X, Yn)
  ).

move_e(Board, NewBoard, X, Y) :- New is X + 1, get_element(Board, New, Y, Element),
  ( Element == '.', move(Board, NewBoard, 1, New, Y, X, Y)
    ;
    Element == '0', Xn is X + 2, get_element(Board, Xn, Y, Element2), Element2 == '.', move_box(Board, NewBoard, 1, New, Y, X, Y, Xn, Y)
  ).

move_w(Board, NewBoard, X, Y) :- New is X - 1, get_element(Board, New, Y, Element),
  ( Element == '.', move(Board, NewBoard, 1, New, Y, X, Y)
    ;
    Element == '0', Xn is X - 2, get_element(Board, Xn, Y, Element2), Element2 == '.', move_box(Board, NewBoard, 1, New, Y, X, Y, Xn, Y)
  ).

move_n_o(Board, X, Y) :- New is Y - 1, get_element(Board, X, New, Element), Element \= '#'.
move_s_o(Board, X, Y) :- New is Y + 1, get_element(Board, X, New, Element), Element \= '#'.
move_e_o(Board, X, Y) :- New is X + 1, get_element(Board, New, Y, Element), Element \= '#'.
move_w_o(Board, X, Y) :- New is X - 1, get_element(Board, New, Y, Element), Element \= '#'.

move_n_x(Board, X, Y) :- New is Y - 1, get_element(Board, X, New, Element), Element \= '#',
  New2 is Y + 1, get_element(Board, X, New2, Element1), Element1 \= '#',
  ( New3 is X - 1, get_element(Board, New3, New2, Element2), Element2 \= '#', !
    ;
    New4 is X + 1, get_element(Board, New4, New2, Element3), Element3 \= '#', !
    ;
    New5 is New2 + 1, get_element(Board, X, New5, Element4), Element4 \= '#', !
  ).

move_s_x(Board, X, Y) :- New is Y + 1, get_element(Board, X, New, Element), Element \= '#',
  New2 is Y - 1, get_element(Board, X, New2, Element1), Element1 \= '#',
  ( New3 is X - 1, get_element(Board, New3, New2, Element2), Element2 \= '#', !
    ;
    New4 is X + 1, get_element(Board, New4, New2, Element3), Element3 \= '#', !
    ;
    New5 is New2 - 1, get_element(Board, X, New5, Element4), Element4 \= '#', !
  ).

move_e_x(Board, X, Y) :- New is X + 1, get_element(Board, New, Y, Element), Element \= '#',
  New2 is X - 1, get_element(Board, New2, Y, Element1), Element1 \= '#',
  ( New3 is Y - 1, get_element(Board, New2, New3, Element2), Element2 \= '#', !
    ;
    New4 is Y + 1, get_element(Board, New2, New4, Element3), Element3 \= '#', !
    ;
    New5 is New2 - 1, get_element(Board, New5, Y, Element4), Element4 \= '#', !
  ).

move_w_x(Board, X, Y) :- New is X - 1, get_element(Board, New, Y, Element), Element \= '#',
  New2 is X + 1, get_element(Board, New2, Y, Element1), Element1 \= '#',
  ( New3 is Y - 1, get_element(Board, New2, New3, Element2), Element2 \= '#', !
    ;
    New4 is Y + 1, get_element(Board, New2, New4, Element3), Element3 \= '#', !
    ;
    New5 is New2 + 1, get_element(Board, New5, Y, Element4), Element4 \= '#', !
  ).

move_possible(Board, X, Y, Direction) :- Direction == 'n', New is Y - 1, get_element(Board, X, New, Element),
  ( Element == '.'
    ;
    Element == '0', Yn is Y - 2, get_element(Board, X, Yn, Element2), Element2 == '.'
  ).

move_possible(Board, X, Y, Direction) :- Direction == 's', New is Y + 1, get_element(Board, X, New, Element),
  ( Element == '.'
    ;
    Element == '0', Yn is Y + 2, get_element(Board, X, Yn, Element2), Element2 == '.'
  ).

move_possible(Board, X, Y, Direction) :- Direction == 'e', New is X + 1, get_element(Board, New, Y, Element),
  ( Element == '.'
    ;
    Element == '0', Xn is X + 2, get_element(Board, Xn, Y, Element2), Element2 == '.'
  ).

move_possible(Board, X, Y, Direction) :- Direction == 'w', New is X - 1, get_element(Board, New, Y, Element),
  ( Element == '.'
    ;
    Element == '0', Xn is X - 2, get_element(Board, Xn, Y, Element2), Element2 == '.'
  ).

pattern(Path) :- length(Path, Length), nth1(Length, Path, A),
  Length2 is Length - 2, nth1(Length2, Path, A), Length1 is Length - 1, nth1(Length1, Path, B),
  ( A == 'n', B == 's'
    ;
    A == 's', B == 'n'
    ;
    A == 'e', B == 'w'
    ;
    A == 'w', B == 'e'
  ).

pattern(Path) :- length(Path, Length), nth1(Length, Path, A),
  Length5 is Length - 5, nth1(Length5, Path, A), Length4 is Length - 4, nth1(Length4, Path, A), Length3 is Length - 3, nth1(Length3, Path, B), Length2 is Length - 2, nth1(Length2, Path, B), Length1 is Length - 1, nth1(Length1, Path, A),
  ( A == 'n', B == 's'
    ;
    A == 's', B == 'n'
    ;
    A == 'e', B == 'w'
    ;
    A == 'w', B == 'e'
  ).

pattern(Path) :- length(Path, Length), nth1(Length, Path, A),
  Length8 is Length - 8, nth1(Length8, Path, A), Length7 is Length - 7, nth1(Length7, Path, A), Length6 is Length - 6, nth1(Length6, Path, A), Length5 is Length - 5, nth1(Length5, Path, B), Length4 is Length - 4, nth1(Length4, Path, B), Length3 is Length - 3, nth1(Length3, Path, B), Length2 is Length - 2, nth1(Length2, Path, A), Length1 is Length - 1, nth1(Length1, Path, A),
  ( A == 'n', B == 's'
    ;
    A == 's', B == 'n'
    ;
    A == 'e', B == 'w'
    ;
    A == 'w', B == 'e'
  ).

pattern(Path) :- length(Path, Length), nth1(Length, Path, A),
  Length11 is Length - 11, nth1(Length11, Path, A), Length10 is Length - 10, nth1(Length10, Path, A), Length9 is Length - 9, nth1(Length9, Path, A), Length8 is Length - 8, nth1(Length8, Path, A), Length7 is Length - 7, nth1(Length7, Path, B), Length6 is Length - 6, nth1(Length6, Path, B), Length5 is Length - 5, nth1(Length5, Path, B), Length4 is Length - 4, nth1(Length4, Path, B), Length3 is Length - 3, nth1(Length3, Path, A), Length2 is Length - 2, nth1(Length2, Path, A), Length1 is Length - 1, nth1(Length1, Path, A),
  ( A == 'n', B == 's'
    ;
    A == 's', B == 'n'
    ;
    A == 'e', B == 'w'
    ;
    A == 'w', B == 'e'
  ).

pattern(Path) :- length(Path, Length), nth1(Length, Path, A),
  Length14 is Length - 14, nth1(Length14, Path, A), Length13 is Length - 13, nth1(Length13, Path, A), Length12 is Length - 12, nth1(Length12, Path, A), Length11 is Length - 11, nth1(Length11, Path, A), Length10 is Length - 10, nth1(Length10, Path, A), Length9 is Length - 9, nth1(Length9, Path, B), Length8 is Length - 8, nth1(Length8, Path, B), Length7 is Length - 7, nth1(Length7, Path, B), Length6 is Length - 6, nth1(Length6, Path, B), Length5 is Length - 5, nth1(Length5, Path, B), Length4 is Length - 4, nth1(Length4, Path, A), Length3 is Length - 3, nth1(Length3, Path, A), Length2 is Length - 2, nth1(Length2, Path, A), Length1 is Length - 1, nth1(Length1, Path, A),
  ( A == 'n', B == 's'
    ;
    A == 's', B == 'n'
    ;
    A == 'e', B == 'w'
    ;
    A == 'w', B == 'e'
  ).

pattern(Path) :- length(Path, Length), nth1(Length, Path, A),
  Length17 is Length - 17, nth1(Length17, Path, A), Length16 is Length - 16, nth1(Length16, Path, A), Length15 is Length - 15, nth1(Length15, Path, A), Length14 is Length - 14, nth1(Length14, Path, A), Length13 is Length - 13, nth1(Length13, Path, A), Length12 is Length - 12, nth1(Length12, Path, A), Length11 is Length - 11, nth1(Length11, Path, B), Length10 is Length - 10, nth1(Length10, Path, B), Length9 is Length - 9, nth1(Length9, Path, B), Length8 is Length - 8, nth1(Length8, Path, B), Length7 is Length - 7, nth1(Length7, Path, B), Length6 is Length - 6, nth1(Length6, Path, B), Length5 is Length - 5, nth1(Length5, Path, A), Length4 is Length - 4, nth1(Length4, Path, A), Length3 is Length - 3, nth1(Length3, Path, A), Length2 is Length - 2, nth1(Length2, Path, A), Length1 is Length - 1, nth1(Length1, Path, A),
  ( A == 'n', B == 's'
    ;
    A == 's', B == 'n'
    ;
    A == 'e', B == 'w'
    ;
    A == 'w', B == 'e'
  ).

pattern(Path) :- length(Path, Length), nth1(Length, Path, A),
  Length20 is Length - 20, nth1(Length20, Path, A), Length19 is Length - 19, nth1(Length19, Path, A), Length18 is Length - 18, nth1(Length18, Path, A), Length17 is Length - 17, nth1(Length17, Path, A), Length16 is Length - 16, nth1(Length16, Path, A), Length15 is Length - 15, nth1(Length15, Path, A), Length14 is Length - 14, nth1(Length14, Path, A), Length13 is Length - 13, nth1(Length13, Path, B), Length12 is Length - 12, nth1(Length12, Path, B), Length11 is Length - 11, nth1(Length11, Path, B), Length10 is Length - 10, nth1(Length10, Path, B), Length9 is Length - 9, nth1(Length9, Path, B), Length8 is Length - 8, nth1(Length8, Path, B), Length7 is Length - 7, nth1(Length7, Path, B), Length6 is Length - 6, nth1(Length6, Path, A), Length5 is Length - 5, nth1(Length5, Path, A), Length4 is Length - 4, nth1(Length4, Path, A), Length3 is Length - 3, nth1(Length3, Path, A), Length2 is Length - 2, nth1(Length2, Path, A), Length1 is Length - 1, nth1(Length1, Path, A),
  ( A == 'n', B == 's'
    ;
    A == 's', B == 'n'
    ;
    A == 'e', B == 'w'
    ;
    A == 'w', B == 'e'
  ).

% ...

dead_Path(Board, Path) :- initial_position(A, B), run_Path(Board, Path, A, B, X, Y, NewBoard),
  ( Path \= [], X == A, Y == B, Board == NewBoard, !
    ;
    get_BoxList(NewBoard, BoxList, 1), \+ check_BoxList(NewBoard, BoxList), !
  ).

get_BoxList([], [], _).
get_BoxList([Head|Board], BoxList, Yc) :-
  ( \+ member('0', Head), BoxList1 = [], !
    ;
    check_row(Head, BoxList1, 1, Yc), !
  ), YcN is Yc + 1, get_BoxList(Board, BoxList2, YcN), append(BoxList1, BoxList2, BoxList).

check_row([], [], _, _).
check_row(['0'|Tail], [[Xc, Yc]|BoxList], Xc, Yc) :- XcN is Xc + 1, check_row(Tail, BoxList, XcN, Yc).
check_row([Symbol|Tail], BoxList, Xc, Yc) :- Symbol \= '0', XcN is Xc + 1, check_row(Tail, BoxList, XcN, Yc).

check_BoxList(_, []).
check_BoxList(Board, [[X, Y]|Tail]) :-
  ( final_position(X, Y), !
    ;
    Xp is X + 1, Xm is X - 1, get_element(Board, Xp, Y, EXp), EXp \= '#', get_element(Board, Xm, Y, EXm), EXm \= '#', !
    ;
    Yp is Y + 1, Ym is Y - 1, get_element(Board, X, Yp, EYp), EYp \= '#', get_element(Board, X, Ym, EYm), EYm \= '#', !
  ), check_BoxList(Board, Tail).

possible_Path(_, [], _, _).
possible_Path(Board, [Head|Tail], X, Y) :-
  ( Head == 'n', move_n(Board, NewBoard, X, Y), Xn is X, Yn is Y - 1, !
    ;
    Head == 's', move_s(Board, NewBoard, X, Y), Xn is X, Yn is Y + 1, !
    ;
    Head == 'e', move_e(Board, NewBoard, X, Y), Xn is X + 1, Yn is Y, !
    ;
    Head == 'w', move_w(Board, NewBoard, X, Y), Xn is X - 1, Yn is Y, !
  ), possible_Path(NewBoard, Tail, Xn, Yn).

run_Path(Board, [], X, Y, X, Y, Board).
run_Path(Board, [Head|Tail], X, Y, XAfterPath, YAfterPath, BoardAfterPath) :-
  ( Head == 'n', move_n(Board, NewBoard, X, Y), Xn is X, Yn is Y - 1, !
    ;
    Head == 's', move_s(Board, NewBoard, X, Y), Xn is X, Yn is Y + 1, !
    ;
    Head == 'e', move_e(Board, NewBoard, X, Y), Xn is X + 1, Yn is Y, !
    ;
    Head == 'w', move_w(Board, NewBoard, X, Y), Xn is X - 1, Yn is Y, !
  ), run_Path(NewBoard, Tail, Xn, Yn, XAfterPath, YAfterPath, BoardAfterPath).

% }
% iterative {

get_NextPath_iterative([], _).
get_NextPath_iterative(NextPath, Board) :- append(Tail, [_], NextPath),
  get_NextPath_iterative(Tail, Board),
  ( append(Tail, ['n'], NextPath), initial_position(A, B), possible_Path(Board, NextPath, A, B), \+ pattern(NextPath), \+ dead_Path(Board, NextPath)
    ;
    append(Tail, ['s'], NextPath), initial_position(A, B), possible_Path(Board, NextPath, A, B), \+ pattern(NextPath), \+ dead_Path(Board, NextPath)
    ;
    append(Tail, ['e'], NextPath), initial_position(A, B), possible_Path(Board, NextPath, A, B), \+ pattern(NextPath), \+ dead_Path(Board, NextPath)
    ;
    append(Tail, ['w'], NextPath), initial_position(A, B), possible_Path(Board, NextPath, A, B), \+ pattern(NextPath), \+ dead_Path(Board, NextPath)
  ).

iterative :-
  board(Board),
  get_NextPath_iterative(NextPath, Board),
  pengine_output(NextPath).

% }
% astar {

initial(Path, X, Y) :- Path \= [],
  run_Path_astar(Path, X, Y, Xn, Yn),
  X == Xn, Y == Yn.

get_NextPath_astar(NextPath, Path) :- board(Board),
  ( append(Path, ['n'], NextPath), initial_position(A, B), possible_Path(Board, NextPath, A, B), \+ pattern(NextPath), \+ dead_Path(Board, NextPath)
    ;
    append(Path, ['s'], NextPath), initial_position(A, B), possible_Path(Board, NextPath, A, B), \+ pattern(NextPath), \+ dead_Path(Board, NextPath)
    ;
    append(Path, ['e'], NextPath), initial_position(A, B), possible_Path(Board, NextPath, A, B), \+ pattern(NextPath), \+ dead_Path(Board, NextPath)
    ;
    append(Path, ['w'], NextPath), initial_position(A, B), possible_Path(Board, NextPath, A, B), \+ pattern(NextPath), \+ dead_Path(Board, NextPath)
  ).

get_NextPath_astar_o(NextPath, Path, X, Y) :- board(Board),
  ( append(Path, ['n'], NextPath), possible_Path_o(Board, NextPath, X, Y), \+ pattern(NextPath), \+ initial(NextPath, X, Y)
    ;
    append(Path, ['s'], NextPath), possible_Path_o(Board, NextPath, X, Y), \+ pattern(NextPath), \+ initial(NextPath, X, Y)
    ;
    append(Path, ['e'], NextPath), possible_Path_o(Board, NextPath, X, Y), \+ pattern(NextPath), \+ initial(NextPath, X, Y)
    ;
    append(Path, ['w'], NextPath), possible_Path_o(Board, NextPath, X, Y), \+ pattern(NextPath), \+ initial(NextPath, X, Y)
  ).

get_NextPath_astar_x(NextPath, Path, X, Y) :- board(Board),
  ( append(Path, ['n'], NextPath), possible_Path_x(Board, NextPath, X, Y), \+ pattern(NextPath), \+ initial(NextPath, X, Y)
    ;
    append(Path, ['s'], NextPath), possible_Path_x(Board, NextPath, X, Y), \+ pattern(NextPath), \+ initial(NextPath, X, Y)
    ;
    append(Path, ['e'], NextPath), possible_Path_x(Board, NextPath, X, Y), \+ pattern(NextPath), \+ initial(NextPath, X, Y)
    ;
    append(Path, ['w'], NextPath), possible_Path_x(Board, NextPath, X, Y), \+ pattern(NextPath), \+ initial(NextPath, X, Y)
  ).

possible_Path_o(_, [], _, _).
possible_Path_o(Board, [Head|Tail], X, Y) :-
  ( Head == 'n', move_n_o(Board, X, Y), Xn is X, Yn is Y - 1, !
    ;
    Head == 's', move_s_o(Board, X, Y), Xn is X, Yn is Y + 1, !
    ;
    Head == 'e', move_e_o(Board, X, Y), Xn is X + 1, Yn is Y, !
    ;
    Head == 'w', move_w_o(Board, X, Y), Xn is X - 1, Yn is Y, !
  ), possible_Path_o(Board, Tail, Xn, Yn).

possible_Path_x(_, [], _, _).
possible_Path_x(Board, [Head|Tail], X, Y) :-
  ( Head == 'n', move_n_x(Board, X, Y), Xn is X, Yn is Y - 1, !
    ;
    Head == 's', move_s_x(Board, X, Y), Xn is X, Yn is Y + 1, !
    ;
    Head == 'e', move_e_x(Board, X, Y), Xn is X + 1, Yn is Y, !
    ;
    Head == 'w', move_w_x(Board, X, Y), Xn is X - 1, Yn is Y, !
  ), dead_astar(Board, Xn, Yn), possible_Path_x(Board, Tail, Xn, Yn).

check_Path_o(_, [], X, Y, X, Y).
check_Path_o(Board, [Head|Tail], X, Y, Xg, Yg) :-
  ( Head == 'n', move_n_o(Board, X, Y), Xn is X, Yn is Y - 1, !
    ;
    Head == 's', move_s_o(Board, X, Y), Xn is X, Yn is Y + 1, !
    ;
    Head == 'e', move_e_o(Board, X, Y), Xn is X + 1, Yn is Y, !
    ;
    Head == 'w', move_w_o(Board, X, Y), Xn is X - 1, Yn is Y, !
  ), check_Path_o(Board, Tail, Xn, Yn, Xg, Yg).

check_Path_x(_, [], X, Y, X, Y).
check_Path_x(Board, [Head|Tail], X, Y, Xg, Yg) :-
  ( Head == 'n', move_n_x(Board, X, Y), Xn is X, Yn is Y - 1, !
    ;
    Head == 's', move_s_x(Board, X, Y), Xn is X, Yn is Y + 1, !
    ;
    Head == 'e', move_e_x(Board, X, Y), Xn is X + 1, Yn is Y, !
    ;
    Head == 'w', move_w_x(Board, X, Y), Xn is X - 1, Yn is Y, !
  ), check_Path_x(Board, Tail, Xn, Yn, Xg, Yg).

run_Path_astar([], X, Y, X, Y).
run_Path_astar([Head|Tail], X, Y, XAfterPath, YAfterPath) :-
  ( Head == 'n', Xn is X, Yn is Y - 1, !
    ;
    Head == 's', Xn is X, Yn is Y + 1, !
    ;
    Head == 'e', Xn is X + 1, Yn is Y, !
    ;
    Head == 'w', Xn is X - 1, Yn is Y, !
  ), run_Path_astar(Tail, Xn, Yn, XAfterPath, YAfterPath).

dead_astar(Board, X, Y) :-
  ( final_position(X, Y), !
    ;
    Xp is X + 1, Xm is X - 1, get_element(Board, Xp, Y, EXp), EXp \= '#', get_element(Board, Xm, Y, EXm), EXm \= '#', !
    ;
    Yp is Y + 1, Ym is Y - 1, get_element(Board, X, Yp, EYp), EYp \= '#', get_element(Board, X, Ym, EYm), EYm \= '#', !
  ).

next_to_final_position(X, Y) :-
  ( Xp is X + 1, final_position(Xp, Y), !
    ;
    Xm is X - 1, final_position(Xm, Y), !
    ;
    Yp is Y + 1, final_position(X, Yp), !
    ;
    Ym is Y - 1, final_position(X, Ym), !
  ).

get_FirstBoxList([], []).
get_FirstBoxList([[[_, _], _, _, 0, _]|Combination], FirstBoxList) :- get_FirstBoxList(Combination, FirstBoxList).
get_FirstBoxList([[[_, _], _, _, _, 1]|Combination], FirstBoxList) :- get_FirstBoxList(Combination, FirstBoxList).
get_FirstBoxList([[[X, Y], _, _, H, 0]|Combination], FirstBoxList) :-
  ( H == 'n', Xn is X, Yn is Y + 1
    ;
    H == 's', Xn is X, Yn is Y - 1
    ;
    H == 'e', Xn is X - 1, Yn is Y
    ;
    H == 'w', Xn is X + 1, Yn is Y
  ), \+ next_to_final_position(Xn, Yn), get_FirstBoxList(Combination, FirstBoxList).

get_FirstBoxList([[[X, Y], _, _, H, 0]|Combination], [[Xn, Yn]|FirstBoxList]) :-
  ( H == 'n', Xn is X, Yn is Y + 1
    ;
    H == 's', Xn is X, Yn is Y - 1
    ;
    H == 'e', Xn is X - 1, Yn is Y
    ;
    H == 'w', Xn is X + 1, Yn is Y
  ), next_to_final_position(Xn, Yn), get_FirstBoxList(Combination, FirstBoxList).

get_SecondBoxList([], []).
get_SecondBoxList([[[_, _], _, _, 0, _]|Combination], SecondBoxList) :- get_SecondBoxList(Combination, SecondBoxList).
get_SecondBoxList([[[_, _], _, _, _, 1]|Combination], SecondBoxList) :- get_SecondBoxList(Combination, SecondBoxList).
get_SecondBoxList([[[X, Y], _, _, H, 0]|Combination], [[Xn, Yn]|SecondBoxList]) :-
  ( H == 'n', Xn is X, Yn is Y + 1
    ;
    H == 's', Xn is X, Yn is Y - 1
    ;
    H == 'e', Xn is X - 1, Yn is Y
    ;
    H == 'w', Xn is X + 1, Yn is Y
  ), get_SecondBoxList(Combination, SecondBoxList).

get_ThirdBoxList([], []).
get_ThirdBoxList([[[_, _], _, _, 0, _]|Combination], ThirdBoxList) :- get_ThirdBoxList(Combination, ThirdBoxList).
get_ThirdBoxList([[[X, Y], _, _, H, _]|Combination], [[Xn, Yn]|ThirdBoxList]) :-
  ( H == 'n', Xn is X, Yn is Y + 1
    ;
    H == 's', Xn is X, Yn is Y - 1
    ;
    H == 'e', Xn is X - 1, Yn is Y
    ;
    H == 'w', Xn is X + 1, Yn is Y
  ), get_ThirdBoxList(Combination, ThirdBoxList).

get_MinDist(Board, Path, MinDist) :-
  initial_position(A, B),
  run_Path(Board, Path, A, B, X, Y, NewBoard),
  get_BoxList(NewBoard, BoxList, 1),
  get_DistList(BoxList, X, Y, DistList),
  min_list(DistList, MinDist).

get_DistList([], _, _, []).
get_DistList([[Xb, Yb]|BoxList], X, Y, [Dist|DistList]) :-
  astar_o(X, Y, Xb, Yb, Dist), !,

  get_DistList(BoxList, X, Y, DistList).

get_GoalList(GoalList) :- bagof([X, Y], final_position(X, Y), GoalList).

astar_x([X, Y], [Xg, Yg], D, HeadPath, Box) :-
  ( X == Xg, Y == Yg, D is 0, HeadPath is 0, Box is 0, !
    ;
    astar_x(X, Y, Xg, Yg, Dist, HeadPath, Box), PartOfD is Box * 20, D is Dist + PartOfD, !
    ;
    D is 9999, !
  ).

astar_x(X, Y, Xg, Yg, Dist, HeadPath, Box) :- expand_x(l([], 0/0), 9999, _, yes, X, Y, Xg, Yg, Dist, HeadPath, Box).

no_box_on_Path(_, [], _, _).
no_box_on_Path(Board, [Head|Tail], X, Y) :-
  ( Head == 'n', Xn is X, Yn is Y - 1, check_for_box(Board, Xn, Yn), !
    ;
    Head == 's', Xn is X, Yn is Y + 1, check_for_box(Board, Xn, Yn), !
    ;
    Head == 'e', Xn is X + 1, Yn is Y, check_for_box(Board, Xn, Yn), !
    ;
    Head == 'w', Xn is X - 1, Yn is Y, check_for_box(Board, Xn, Yn), !
  ), no_box_on_Path(Board, Tail, Xn, Yn).

get_HeadPath([HeadPath|_], HeadPath).

expand_x(l(Path, _/_), _, _, yes, X, Y, Xg, Yg, Dist, HeadPath, Box) :-
  board(Board), check_Path_x(Board, Path, X, Y, Xg, Yg), !,
  ( no_box_on_Path(Board, Path, X, Y), Box is 0, !
    ;
    Box is 1, !
  ), length(Path, Dist), get_HeadPath(Path, HeadPath).

expand_x(l(Path, CH/C), B, T1, Solved, X, Y, Xg, Yg, Dist, HeadPath, Box) :- CH =< B, Cost is C + 1,
  ( bagof(NextPath/Cost, get_NextPath_astar_x(NextPath, Path, X, Y), PCs), !,
    succlist_astar(PCs, Ts, X, Y, Xg, Yg),
    bestCH(Ts, CH1),
    expand_x(t(Path, CH1/C, Ts), B, T1, Solved, X, Y, Xg, Yg, Dist, HeadPath, Box)
    ;
    Solved = never
  ).

expand_x(t(Path, CH/C, [T|Ts]), B, T1, Solved, X, Y, Xg, Yg, Dist, HeadPath, Box) :- CH =< B,
  bestCH(Ts, CH1),
  B1 is min(B, CH1),
  expand_x(T, B1, T2, Solved1, X, Y, Xg, Yg, Dist, HeadPath, Box),
  continue_x(t(Path, CH/C, [T2|Ts]), B, T1, Solved1, Solved, X, Y, Xg, Yg, Dist, HeadPath, Box).

expand_x(t(_, _, []), _, _, never, _, _, _, _, _, _, _) :- !.

expand_x(T, B, T, no, _, _, _, _, _, _, _) :-
  ch(T, CH),
  CH > B.

get_H_astar(Path, H, X, Y, Xg, Yg) :-
  run_Path_astar(Path, X, Y, Xn, Yn),
  Xdiff is Xg - Xn,
  Ydiff is Yg - Yn,
  Xabs is abs(Xdiff),
  Yabs is abs(Ydiff),
  H is Xabs + Yabs.

succlist_astar([], [], _, _, _, _).

succlist_astar([Path/C|PCs], Ts, X, Y, Xg, Yg) :-
  get_H_astar(Path, H, X, Y, Xg, Yg),
  CH is C + H,
  succlist_astar(PCs, Ts1, X, Y, Xg, Yg),
  insert(l(Path, CH/C), Ts1, Ts).

continue_x(_, _, _, yes, yes, _, _, _, _, _, _, _).

continue_x(t(Path, _/C, [T|Ts]), B, T1, no, Solved, X, Y, Xg, Yg, Dist, HeadPath, Box) :-
  insert(T, Ts, Ts1),
  bestCH(Ts1, CH1),
  expand_x(t(Path, CH1/C, Ts1), B, T1, Solved, X, Y, Xg, Yg, Dist, HeadPath, Box).

continue_x(t(Path, _/C, [_|Ts]), B, T1, never, Solved, X, Y, Xg, Yg, Dist, HeadPath, Box) :-
  bestCH(Ts, CH1),
  expand_x(t(Path, CH1/C, Ts), B, T1, Solved, X, Y, Xg, Yg, Dist, HeadPath, Box).

check_for_box(Board, X, Y) :- nth1(Y, Board, Row), nth1(X, Row, Element), (Element \= '0', ! ; final_position(X, Y), !).

astar_o(X, Y, Xg, Yg, Dist) :- expand_o(l([], 0/0), 9999, _, yes, X, Y, Xg, Yg, Dist).

expand_o(l(Path, _/_), _, _, yes, X, Y, Xg, Yg, Dist) :-
  board(Board), check_Path_o(Board, Path, X, Y, Xg, Yg), !,
  length(Path, Dist).

expand_o(l(Path, CH/C), B, T1, Solved, X, Y, Xg, Yg, Dist) :- CH =< B, Cost is C + 1,
  ( bagof(NextPath/Cost, get_NextPath_astar_o(NextPath, Path, X, Y), PCs), !,
    succlist_astar(PCs, Ts, X, Y, Xg, Yg),
    bestCH(Ts, CH1),
    expand_o(t(Path, CH1/C, Ts), B, T1, Solved, X, Y, Xg, Yg, Dist)
    ;
    Solved = never
  ).

expand_o(t(Path, CH/C, [T|Ts]), B, T1, Solved, X, Y, Xg, Yg, Dist) :- CH =< B,
  bestCH(Ts, CH1),
  B1 is min(B, CH1),
  expand_o(T, B1, T2, Solved1, X, Y, Xg, Yg, Dist),
  continue_o(t(Path, CH/C, [T2|Ts]), B, T1, Solved1, Solved, X, Y, Xg, Yg, Dist).

expand_o(t(_, _, []), _, _, never, _, _, _, _, _) :- !.

expand_o(T, B, T, no, _, _, _, _, _) :-
  ch(T, CH),
  CH > B.

continue_o(_, _, _, yes, yes, _, _, _, _, _).

continue_o(t(Path, _/C, [T|Ts]), B, T1, no, Solved, X, Y, Xg, Yg, Dist) :-
  insert(T, Ts, Ts1),
  bestCH(Ts1, CH1),
  expand_o(t(Path, CH1/C, Ts1), B, T1, Solved, X, Y, Xg, Yg, Dist).

continue_o(t(Path, _/C, [_|Ts]), B, T1, never, Solved, X, Y, Xg, Yg, Dist) :-
  bestCH(Ts, CH1),
  expand_o(t(Path, CH1/C, Ts), B, T1, Solved, X, Y, Xg, Yg, Dist).

get_Array(List1, List2, Array) :-
  findall([A, B, D, HeadPath, Box], (member(A, List1), member(B, List2), astar_x(A, B, D, HeadPath, Box)), Array).

get_Bounds(Array, Bounds, Length) :-
  findall(Bound, (subset(Array, Combination), length(Combination, Length), no_overlap(Combination), get_Ds(Combination, Ds), sum_Ds(Ds, Bound)), Bounds).

get_Combination(Array, Bound, Length, Combination) :-
  subset(Array, Combination), length(Combination, Length), no_overlap(Combination), get_Ds(Combination, Ds), sum_Ds(Ds, Bound), !.

subset([], []).
subset([E|Tail], [E|NTail]):-
  subset(Tail, NTail).
subset([_|Tail], NTail):-
  subset(Tail, NTail).

no_overlap(Combination) :-
  get_Xs(Combination, Xs),
  setof(X, member(X, Xs), XSet),
  length(Xs, Length),
  length(XSet, Length),

  get_Ys(Combination, Ys),
  setof(Y, member(Y, Ys), YSet),
  length(Ys, Length),
  length(YSet, Length).

get_Ds(Combination, Ds) :-
  findall(D, (member(Element, Combination), get_D(Element, D)), Ds).

get_D([_, _, D, _, _], D).

get_Xs(Combination, Xs) :-
  findall(X, (member(Element, Combination), get_X(Element, X)), Xs).

get_X([X, _, _, _, _], X).

get_Ys(Combination, Ys) :-
  findall(Y, (member(Element, Combination), get_Y(Element, Y)), Ys).

get_Y([_, Y, _, _, _], Y).

sum_Ds([], 0).
sum_Ds([Head|Tail], Sum) :-
  sum_Ds(Tail, Rest),
  Sum is Head + Rest.

astar :- expand(l([], 0/0), 9999, _, yes).

get_H(Path, H) :-
  board(Board),
  initial_position(A, B),
  run_Path(Board, Path, A, B, X, Y, NewBoard),
  get_BoxList(NewBoard, BoxList, 1),
  length(BoxList, Length),
  get_GoalList(GoalList),
  length(GoalList, Length),
  get_Array(BoxList, GoalList, Array),
  get_Bounds(Array, Bounds, Length),
  min_list(Bounds, MinimumBound),
  H1 is MinimumBound * 20,
  get_Combination(Array, MinimumBound, Length, Combination),
  get_FirstBoxList(Combination, FirstBoxList),
  ( FirstBoxList == [],
    get_SecondBoxList(Combination, SecondBoxList),
    ( SecondBoxList == [],
      get_ThirdBoxList(Combination, ThirdBoxList), !,
      get_DistList(ThirdBoxList, X, Y, DistList)
      ;
      get_DistList(SecondBoxList, X, Y, DistList), !
    )
    ;
    get_DistList(FirstBoxList, X, Y, DistList), !
  ),

  ( min_list(DistList, MinDist), !
    ;
    MinDist is 0
  ), H2 is MinDist * 1,
  findall(0, (member(Element, Combination), \+ get_D(Element, 0)), D0s),
  length(D0s, LengthD0s),
  H3 is LengthD0s * 15,
  PartOfH is H1 + H2,
  H is PartOfH + H3.

expand(l(Path, _/_), _, _, yes) :-
  pengine_output(Path).

expand(l(Path, CH/C), B, T1, Solved) :- CH =< B, Cost is C + 1,
  ( bagof(NextPath/H, (get_NextPath_astar(NextPath, Path), get_H(NextPath, H), H < 9999), PCs), !,
    succlist(PCs, Ts, Cost),
    bestCH(Ts, CH1),
    expand(t(Path, CH1/C, Ts), B, T1, Solved)
    ;
    Solved = never
  ).

expand(t(Path, CH/C, [T|Ts]), B, T1, Solved) :-
  CH =< B,
  bestCH(Ts, CH1),
  B1 is min(B, CH1),
  expand(T, B1, T2, Solved1),
  continue(t(Path, CH/C, [T2|Ts]), B, T1, Solved1, Solved).

expand(t(_, _, []), _, _, never) :- !.

expand(T, B, T, no) :-
  ch(T, CH),
  CH > B.

succlist([], [], _).

succlist([Path/H|PCs], Ts, Cost) :-
  CH is Cost + H,
  succlist(PCs, Ts1, Cost),
  insert(l(Path, CH/Cost), Ts1, Ts).

bestCH([T|_], CH) :- ch(T, CH).

bestCH([], 9999).

continue(_, _, _, yes, yes).

continue(t(Path, _/C, [T|Ts]), B, T1, no, Solved) :-
  insert(T, Ts, Ts1),
  bestCH(Ts1, CH1),
  expand(t(Path, CH1/C, Ts1), B, T1, Solved).

continue(t(Path, _/C, [_|Ts]), B, T1, never, Solved) :-
  bestCH(Ts, CH1),
  expand(t(Path, CH1/C, Ts), B, T1, Solved).

ch(l(_, CH/_), CH).

ch(t(_, CH/_, _), CH).

insert(T, Ts, [T|Ts]) :-
  ch(T, CH),
  bestCH(Ts, CH1),
  CH =< CH1, !.

insert(T, [T1|Ts], [T1|Ts1]) :- insert(T, Ts, Ts1).

% }

start_iterative(Board) :- assert_positions(Board, NewBoard, 1), asserta(board(NewBoard)), iterative.
start_astar(Board) :- assert_positions(Board, NewBoard, 1), asserta(board(NewBoard)), astar.