import React from 'react';
import { Routes, Route } from 'react-router-dom';
import routes from './routes/routes';

//SCREENS
import Welcome from '../src/screens/welcome/Welcome';
import Tutorial from '../src/screens/tutorial/Tutorial';
import UiGame from './components/ui/hookComponents/game/UiGame';
import Ranking from '../src/screens/ranking/Ranking';
import NotFound from '../src/screens/notFound/NotFound';



function Routing() {
    return (
        <Routes>

            <Route path={routes.WELCOME} index element={<Welcome />} />
            <Route path={routes.TUTORIAL} element={<Tutorial />} />
            <Route path={routes.GAME} element={<UiGame />} />
            <Route path={routes.RANKING} element={<Ranking />} />

            <Route path="*" element={<NotFound />} />

        </Routes>
    );
}

export default Routing;